import CsvTable from "@/components/csvTable";
import UpdateTable from "@/components/updateTable";
import { api } from "@/lib/axios";
import { MarketContext } from "@/pages/_app"
import { validatedButton } from "@/util/buttonValidate";
import React, { FormEvent, useContext, useEffect, useState } from "react"

const File = () => {
  const {
    setIsValid,
    csvFile,
    setProductList,
    setCsvFile,
    setValidate,
    productList,
    setToNewPrices,
    toNewPrices,
    setChanges } = useContext(MarketContext);
  const [isValidToChange, setIsValidToChange] = useState<boolean>(true);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0]);
      setChanges([]);
      setIsUpdated(false);
      setIsValid(false);
    } else {
      setCsvFile(null);
    }
  };

  const handleClickTonewPricesButton = async(e: FormEvent) => {
    e.preventDefault();
    try {
      await Promise.all(
        toNewPrices.map(async ({ code, newPrice }) => {
          api.patch(`products/${code}`, { newPrice });
        })
      );
    } catch (error) {
      console.log(error);
    }
    const toChange = toNewPrices.map(({ code, newPrice }) => {
      const product = productList.filter(oldProduct => oldProduct.code === parseInt(code))[0];
      return ({
        code: product.code,
        newPrice: parseInt(newPrice),
        name: product.name,
        currentPrice: product.sales_price,
      });
    });
    const arryToProductsListCache = [...productList];
    const indexToChanges = toNewPrices.map(({ code }) => productList
    .findIndex(product => product.code === parseInt(code)));
    indexToChanges.forEach(i => arryToProductsListCache[i].sales_price = parseInt(toNewPrices[i].newPrice));

    setChanges(toChange);
    setProductList(arryToProductsListCache);
    setCsvFile(null);
    setIsUpdated(true);
  }

  const toValidate = {
    productList,
    setIsValidToChange,
    setValidate,
    csvFile,
    setToNewPrices
  }

  useEffect(() => {
    if (productList.length > 0) {
      // @ts-ignore
      validatedButton(toValidate);
    }
    if (csvFile === null) {
      setToNewPrices([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [csvFile])

  return (
    <div>
      <h1>Upload do arquivo com os códigos e novos preços!</h1>
      <form>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={(e: FormEvent) => {
          e.preventDefault();
          setIsValid(true)
        }}>Validar</button>
        <button disabled={isValidToChange} onClick={handleClickTonewPricesButton}>Atualizar</button>
      </form>
      { isUpdated ? <UpdateTable /> : <CsvTable /> }
    </div>
  );
}

export default File;