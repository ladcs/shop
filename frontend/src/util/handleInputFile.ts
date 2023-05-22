import { Dispatch, RefObject, SetStateAction } from "react";

interface params {
  setCsvFile: Dispatch<SetStateAction<File | null>>;
  setChanges: Dispatch<SetStateAction<[] | Changes[]>>;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  setIsValid: Dispatch<SetStateAction<boolean>>;
  fileInputRef: RefObject<HTMLInputElement>;
}

export const handleFileChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  params: params,
  ) => {
  if(e.target.files && e.target.files.length > 0) {
    params.setCsvFile(e.target.files[0]);
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