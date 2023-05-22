import { IProduct } from "@/interface/IProduct";
import { Dispatch, SetStateAction } from "react";

interface sets  {
  setChanges: Dispatch<SetStateAction<[] | Changes[]>>,
  setAllProducts: Dispatch<SetStateAction<[] | IProduct[]>>,
  setCsvFile: Dispatch<SetStateAction<File | null>>,
  setIsUpdated: Dispatch<SetStateAction<boolean>>,
}

export function changeInCache(toNewPrices: [] | NewPrices[], allProducts: [] | IProduct[], setsOfReact: sets) {
  const toChange = toNewPrices.map(({ code, newPrice }) => {
    const product = allProducts.filter(oldProduct => oldProduct
      .code === parseInt(typeof code === 'string' ? code : `${code}`))[0];
    if (typeof newPrice === 'string') {
      const price =  parseFloat(newPrice).toFixed(2);
      return ({
        code: product.code,
        newPrice: price,
        name: product.name,
        currentPrice: product.sales_price,
      });
    }
    return ({
      code,
      newPrice: newPrice.toFixed(2),
      name: product.name,
      currentPrice: product.sales_price,
    });
  });
  const arryToProductsListCache = [...allProducts];
  const indexToChanges = toNewPrices.map(({ code }) => allProducts
  .findIndex(product => {
    if (typeof code === 'string') return product.code === parseInt(code);
    return product.code === code;
  }));
  indexToChanges.forEach((indexToChange, i) => {
    arryToProductsListCache[indexToChange].sales_price = toChange[i].newPrice;
  });
  setsOfReact.setChanges(toChange);
  setsOfReact.setAllProducts(arryToProductsListCache);
  setsOfReact.setCsvFile(null);
  setsOfReact.setIsUpdated(true);
}