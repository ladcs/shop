import CsvTable from "@/components/csvTable";
import Header from "@/components/header";
import UpdateTable from "@/components/updateTable";
import { api } from "@/lib/axios";
import { MarketContext } from "@/pages/_app"
import { validatedButton } from "@/util/buttonValidate";
import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect, useRef, useState } from "react"

const File = () => {
  const {
    isValid,
    setIsValid,
    csvFile,
    setProductList,
    setCsvFile,
    setValidate,
    productList,
    setToNewPrices,
    toNewPrices,
    setChanges } = useContext(MarketContext);

  const route = useRouter();
  useEffect(() => {
    if(productList.length === 0) {
      route.push('/');
    }
  }, []);
  const [isValidToChange, setIsValidToChange] = useState<boolean>(true);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0]);
      setChanges([]);
      setIsUpdated(false);
      setIsValid(false);
    } else {
      setCsvFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleClickTonewPricesButton = async(e: FormEvent) => {
    e.preventDefault();
    try {
      await Promise.all(
        toNewPrices.map(async ({ code, newPrice }) => {
          api.patch(`products/${code}`, { newPrice: parseFloat(newPrice) * 100 });
        })
      );
    } catch (error) {
      console.log(error);
    }
    const toChange = toNewPrices.map(({ code, newPrice }) => {
      const product = productList.filter(oldProduct => oldProduct.code === parseInt(code))[0];
      return ({
        code: product.code,
        newPrice: parseFloat(newPrice),
        name: product.name,
        currentPrice: product.sales_price,
      });
    });
    const arryToProductsListCache = [...productList];
    const indexToChanges = toNewPrices.map(({ code }) => productList
    .findIndex(product => product.code === parseInt(code)));
    indexToChanges.forEach((indexToChange, i) => arryToProductsListCache[indexToChange]
      .sales_price = parseFloat(toNewPrices[i].newPrice));

    setChanges(toChange);
    setProductList(arryToProductsListCache);
    setCsvFile(null);
    setIsUpdated(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
      <Header />
      <h1>Upload do arquivo com os códigos e novos preços!</h1>
      <form>
        <input type="file" accept=".csv" onChange={handleFileChange} ref={fileInputRef}/>
        <button disabled={
          csvFile === null
        } onClick={(e: FormEvent) => {
          e.preventDefault();
          setIsValid(true)
        }}>Validar</button>
        <button disabled={isValidToChange && !isValid} onClick={handleClickTonewPricesButton}>Atualizar</button>
      </form>
      { isUpdated ? <UpdateTable /> : <CsvTable /> }
    </div>
  );
}

export default File;