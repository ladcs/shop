import CsvTable from "@/components/csvTable";
import Header from "@/components/header";
import UpdateTable from "@/components/updateTable";
import { MarketContext } from "@/pages/_app"
import { addPackInChanges } from "@/util/addPackInChanges";
import { changeInCache } from "@/util/changeInCache";
import { handleFileChange } from "@/util/handleInputFile";
import { toChangeTable } from "@/util/toChangeTable";
import { updateDb } from "@/util/updateDb";
import { Button } from "@mui/material";
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
    setIsValidToChange,
    csvFile,
    setValidate,
  }

  const toHandleFileChange = {
    setCsvFile,
    setChanges,
    setIsUpdated,
    setIsValid,
    fileInputRef,
    setToNewPrices,
    allProducts,
    setIsValidToChange,
    setValidate,
    csvFile,
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
    setToNewPrices([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div>
      <Header />
      <h1 className="flex items-center justify-center bg-green-600 text-purple-100 translate-y-6"
      >
        Upload do arquivo com os códigos e novos preços!
      </h1>
      <form className="items-center justify-center flex flex-1 translate-y-7">
        <input type="file" accept=".csv" onChange={ (e) => {
          handleFileChange(e, toHandleFileChange)
          } 
        }
          ref={fileInputRef}
          className="leading-relaxed pr-96"
        />
        <Button
          variant="outlined"
          disabled={
          csvFile === null || isValid
        } onClick={(e: FormEvent) => {
          e.preventDefault();
          addPackInChanges(addPackInChangesParams);
          toChangeTable(toNewPrices, allProducts, setChanges);
          setIsValid(true);
          setIsUpdated(true);
        }}
          className="w-28 rigth-0"
        >Validar</Button>
        <Button
        variant="outlined"
        className="w-28 items-center justify-center"
        disabled={isValidToChange || !isValid }
        onClick={handleClickTonUpdatePricesButton}
        >Atualizar</Button>
      </form>
      { isUpdated ? <UpdateTable /> : <CsvTable /> }
    </div>
  );
}

export default File;