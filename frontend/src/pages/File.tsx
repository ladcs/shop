import CsvTable from "@/components/csvTable";
import Header from "@/components/header";
import UpdateTable from "@/components/updateTable";
import { MarketContext } from "@/pages/_app"
import { validatedButton } from "@/util/buttonValidate";
import { changeInCache } from "@/util/changeInCache";
import { handleFileChange } from "@/util/handleInputFile";
import { newPricePack } from "@/util/isProductToPack";
import { updateDb } from "@/util/updateDb";
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
    packsInfo,
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

  const toValidate = {
    allProducts,
    setIsValidToChange,
    setValidate,
    csvFile,
    setToNewPrices
  }

  const toHandleFileChange = {
    setCsvFile,
    setChanges,
    setIsUpdated,
    setIsValid,
    fileInputRef,
  }

  const setsToChangeCache = {
    setChanges,
    setAllProducts,
    setCsvFile,
    setIsUpdated,
  }

  const handleClickTonUpdatePricesButton = async(e: FormEvent) => {
    e.preventDefault();
    const checkPack = toNewPrices.map((product) => {
      const checkPackParams = {
        packsInfo, 
        productCode: product.code,
        newPrice: product.newPrice,
        allProducts,
      }
      return newPricePack(checkPackParams);
    });
    let toNewPrice = [...toNewPrices];
    checkPack.forEach((packs) => {
      toNewPrice = [...toNewPrice, ...packs];
    });
    
    setToNewPrices(toNewPrice);
    updateDb(toNewPrices);
    changeInCache(toNewPrice, allProducts, setsToChangeCache);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
        <button disabled={isValidToChange || !isValid } onClick={handleClickTonUpdatePricesButton}>Atualizar</button>
      </form>
      { isUpdated ? <UpdateTable /> : <CsvTable /> }
    </div>
  );
}

export default File;