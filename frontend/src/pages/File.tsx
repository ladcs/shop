import CsvTable from "@/components/csvTable";
import Header from "@/components/header";
import UpdateTable from "@/components/updateTable";
import { MarketContext } from "@/pages/_app"
import { addPackInChanges } from "@/util/addPackInChanges";
import { validatedButton } from "@/util/buttonValidate";
import { changeInCache } from "@/util/changeInCache";
import { handleFileChange } from "@/util/handleInputFile";
import { newPricePack } from "@/util/isProductToPack";
import { toChangeTable } from "@/util/toChangeTable";
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
    setChanges,
    changes,
   } = useContext(MarketContext);

  const route = useRouter();
  useEffect(() => {
    if (csvFile === null) {
      setToNewPrices([]);
    }
    if(allProducts.length === 0) {
      route.push('/');
    }
  }, [csvFile, changes]);
  
  const [isValidToChange, setIsValidToChange] = useState<boolean>(true);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addPackInChangesParams = { 
    toNewPrices,
    packsInfo,
    allProducts,
    setToNewPrices,
  }

  const toValidate = {
    allProducts,
    setIsValidToChange,
    setValidate,
    csvFile,
  }

  const toHandleFileChange = {
    setCsvFile,
    setChanges,
    setIsUpdated,
    setIsValid,
    fileInputRef,
    setToNewPrices,
  }

  const setsToChangeCache = {
    setChanges,
    setAllProducts,
    setCsvFile,
    setIsUpdated,
  }

  const handleClickTonUpdatePricesButton = async(e: FormEvent) => {
    e.preventDefault();
    updateDb(toNewPrices);
    changeInCache(toNewPrices, allProducts, setsToChangeCache);
    setIsValid(false);
    setIsUpdated(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div>
      <Header />
      <h1>Upload do arquivo com os códigos e novos preços!</h1>
      <form>
        <input type="file" accept=".csv" onChange={ (e) => {
          handleFileChange(e, toHandleFileChange)
          } 
        }
          ref={fileInputRef}/>
        <button disabled={
          csvFile === null || isValid
        } onClick={(e: FormEvent) => {
          e.preventDefault();
          // @ts-ignore
          validatedButton(toValidate);
          addPackInChanges(addPackInChangesParams);
          toChangeTable(toNewPrices, allProducts, setChanges);
          setIsValid(true);
          setIsUpdated(true);
        }}>Validar</button>
        <button disabled={isValidToChange || !isValid } onClick={handleClickTonUpdatePricesButton}>Atualizar</button>
      </form>
      { isUpdated ? <UpdateTable /> : <CsvTable /> }
    </div>
  );
}

export default File;