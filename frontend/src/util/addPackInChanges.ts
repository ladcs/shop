import { IPacks } from "@/interface/IPacks";
import { IProduct } from "@/interface/IProduct";
import { Dispatch, SetStateAction } from "react";
import { newPricePack } from "./isProductToPack";
import { validatedButton } from "./buttonValidate";

interface packToChangesParams {
  toNewPrices: NewPrices[];
  packsInfo: IPacks[];
  allProducts: IProduct[];
  setToNewPrices: Dispatch<SetStateAction<NewPrices[] | []>>;
  setIsValidToChange: Dispatch<SetStateAction<boolean>>;
  csvFile : File | null;
  setValidate: Dispatch<SetStateAction<string[]>>;
}

export const addPackInChanges = ({
  toNewPrices,
  packsInfo,
  allProducts,
  setToNewPrices,
  setIsValidToChange,
  csvFile,
  setValidate,
}: packToChangesParams) => {
  const products = validatedButton({
    allProducts,
    setIsValidToChange,
    csvFile,
    setValidate,
    // @ts-ignore
    setToNewPrices,
    // @ts-ignore
    toNewPrices,
  }) as unknown as NewPrices[];
  const checkPack = products.map((product) => {
    const checkPackParams = {
      packsInfo, 
      productCode: product.code,
      newPrice: product.newPrice,
      allProducts,
    }
    // @ts-ignore
    return newPricePack(checkPackParams);
  });
  let updatePackPrices = [...products];
  checkPack.forEach((packs) => {
    updatePackPrices = [...updatePackPrices, ...packs];
  });

setToNewPrices([...updatePackPrices]);
}