import { Dispatch, RefObject, SetStateAction } from "react";
import { productsInCsv } from "./productsInCsv";

interface params {
  setCsvFile: Dispatch<SetStateAction<File | null>>;
  setChanges: Dispatch<SetStateAction<[] | Changes[]>>;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  setIsValid: Dispatch<SetStateAction<boolean>>;
  fileInputRef: RefObject<HTMLInputElement>;
  setToNewPrices: Dispatch<SetStateAction<[] | NewPrices[]>>;
}

export const handleFileChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  params: params,
  ) => {
  if(e.target.files && e.target.files.length > 0) {
    params.setCsvFile(e.target.files[0]);
    const productsToChange = await productsInCsv(e.target.files[0]);
    const toChange = productsToChange.map((product) => ({
      code: product[0],
      newPrice: product[1],
    }));
    // @ts-ignore
    params.setToNewPrices(toChange);
    params.setChanges([]);
    params.setIsUpdated(false);
    params.setIsValid(false);
  } else {
    params.setCsvFile(null);
    if (params.fileInputRef.current) {
      params.fileInputRef.current.value = "";
    }
  }
};