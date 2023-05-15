import { MarketContext } from "@/pages/_app"
import { validatedButton } from "@/util/buttonValidate";
import React, { useContext, useEffect, useState } from "react"

const File = () => {
  const { csvFile, setCsvFile, setValidate, productList } = useContext(MarketContext);
  const [isValidToChange, setIsValidToChange] = useState<boolean>(true);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0]);
    }
  };

  const toValidate = {
    productList,
    setIsValidToChange,
    setValidate,
    csvFile
  }

  useEffect(() => {
    if (productList.length > 0) {
      validatedButton(toValidate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [csvFile])

  return (
    <div>
      <h1>Upload do arquivo com os códigos e novos preços!</h1>
      <form>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button disabled={isValidToChange}>Atualizar</button>
      </form>
    </div>
  );
}

export default File;