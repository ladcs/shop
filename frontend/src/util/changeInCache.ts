import { IProduct } from "@/interface/IProduct";
import { Dispatch, SetStateAction } from "react";

interface sets  {
  setChanges: Dispatch<SetStateAction<[] | Changes[]>>,
  setAllProducts: Dispatch<SetStateAction<[] | IProduct[]>>,
  setCsvFile: Dispatch<SetStateAction<File | null>>,
  setIsUpdated: Dispatch<SetStateAction<boolean>>,
}

export function changeInCache(toNewPrices: [] | NewPrices[], allProducts: [] | IProduct[], setsOfReact: sets) {
  const arryToProductsListCache = [...allProducts];
  const indexToChanges = toNewPrices.map(({ code }) => allProducts
  .findIndex(product => {
    if (typeof code === 'string') return product.code === parseInt(code);
    return product.code === code;
  }));
  indexToChanges.forEach((indexToChange, i) => {
    if(typeof toNewPrices[i].newPrice === 'string') {
      arryToProductsListCache[indexToChange].sales_price = `${toNewPrices[i].newPrice}`;
    }
  });
  setsOfReact.setAllProducts(arryToProductsListCache);
  setsOfReact.setCsvFile(null);
  setsOfReact.setIsUpdated(true);
}