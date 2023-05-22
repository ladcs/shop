import { IProduct } from "@/interface/IProduct";
import { Dispatch, SetStateAction } from "react";

export const toChangeTable = (
  toNewPrices: [] | NewPrices[],
  allProducts: [] | IProduct[],
  setChanges: Dispatch<SetStateAction<[] | Changes[]>>) => {
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
      newPrice: newPrice,
      name: product.name,
      currentPrice: product.sales_price,
    });
  });
  setChanges(toChange);
}