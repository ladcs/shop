import CsvTable from "@/components/csvTable";
import Header from "@/components/header";
import UpdateTable from "@/components/updateTable";
import { api } from "@/lib/axios";
import { MarketContext } from "@/pages/_app"
import { validatedButton } from "@/util/buttonValidate";
import { handleFileChange } from "@/util/handleInputFile";
import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect, useRef, useState } from "react"

const File = () => {
  const {
    isValid,
    setIsValid,
    csvFile,
    allProducts,
    setAllProducts,
    setCsvFile,
    setValidate,
    setToNewPrices,
    toNewPrices,
    setChanges } = useContext(MarketContext);

  const route = useRouter();
  useEffect(() => {
    if(allProducts.length === 0) {
      route.push('/');
    }
  }, []);
  
  const [isValidToChange, setIsValidToChange] = useState<boolean>(true);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toHandleFileChange ={
    setCsvFile,
    setChanges,
    setIsUpdated,
    setIsValid,
    fileInputRef,
  }

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
      const product = allProducts.filter(oldProduct => oldProduct.code === parseInt(code))[0];
      return ({
        code: product.code,
        newPrice: parseFloat(newPrice),
        name: product.name,
        currentPrice: product.sales_price,
      });
    });
    const arryToProductsListCache = [...allProducts];
    const indexToChanges = toNewPrices.map(({ code }) => allProducts
    .findIndex(product => product.code === parseInt(code)));
    indexToChanges.forEach((indexToChange, i) => arryToProductsListCache[indexToChange]
      .sales_price = toNewPrices[i].newPrice);

    setChanges(toChange);
    setAllProducts(arryToProductsListCache);
    setCsvFile(null);
    setIsUpdated(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const toValidate = {
    allProducts,
    setIsValidToChange,
    setValidate,
    csvFile,
    setToNewPrices
  }

  useEffect(() => {
    if (allProducts.length > 0) {
      // @ts-ignore
      validatedButton(toValidate);
    }
    if (csvFile === null) {
      setToNewPrices([]);
    }
  }, [csvFile])

  return (
    <div>
      <Header />
      <h1>Upload do arquivo com os códigos e novos preços!</h1>
      <form>
        <input type="file" accept=".csv" onChange={(e) => handleFileChange(e, toHandleFileChange)} ref={fileInputRef}/>
        <button disabled={
          csvFile === null
        } onClick={(e: FormEvent) => {
          e.preventDefault();
          setIsValid(true)
        }}>Validar</button>
        <button disabled={isValidToChange || !isValid } onClick={handleClickTonewPricesButton}>Atualizar</button>
      </form>
      { isUpdated ? <UpdateTable /> : <CsvTable /> }
    </div>
  );
}

export default File;