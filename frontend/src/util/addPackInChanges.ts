import { IPacks } from "@/interface/IPacks";
import { IProduct } from "@/interface/IProduct";
import { Dispatch, SetStateAction } from "react";
import { newPricePack } from "./isProductToPack";

interface packToChangesParams {
  toNewPrices: NewPrices[];
  packsInfo: IPacks[];
  allProducts: IProduct[];
  setToNewPrices: Dispatch<SetStateAction<NewPrices[] | []>>
}

export const addPackInChanges = ({toNewPrices, packsInfo, allProducts, setToNewPrices}: packToChangesParams) => {
  const checkPack = toNewPrices.map((product) => {
    const checkPackParams = {
    packsInfo, 
    productCode: product.code,
    newPrice: product.newPrice,
    allProducts,
  }
  // @ts-ignore
  return newPricePack(checkPackParams);
});
let updatePackPrices = [...toNewPrices];
checkPack.forEach((packs) => {
  updatePackPrices = [...updatePackPrices, ...packs];
});

setToNewPrices([...updatePackPrices]);
}