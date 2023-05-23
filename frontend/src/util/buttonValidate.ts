import { IProduct } from "@/interface/IProduct";
import { Dispatch, SetStateAction } from "react";
import { lowerPrice, porcentPrice } from "./testPrice";
import { productsInCsv } from "./productsInCsv";

type NewPrices = {
  code: number;
  newPrice: number;
  status: string;
}


type toValidate = {
  allProducts: IProduct[] | [];
  setIsValidToChange: Dispatch<SetStateAction<boolean>>;
  setValidate: Dispatch<SetStateAction<string[]>>;
  csvFile: File | null;
  toNewPrices: [] | NewPrices[];
}

export const validatedButton = ({
  allProducts,
  setIsValidToChange,
  csvFile,
  setValidate,
  toNewPrices,
}: toValidate) => {
      const validate = toNewPrices.map(({code, newPrice}) => {
      if(!code || !newPrice) return ({
        code,
        newPrice,
        status: "Um campo faltante",
      });
      if (typeof newPrice === "number") {
        if(newPrice * 100 % 1 !== 0) return ({
          code,
          newPrice,
          status: "preço inválido, tem que ter o formato R.CC",
        });
      }
      const productInList = allProducts.filter((p) => p.code == code);
      if(productInList.length === 0) return ({
        code,
        newPrice,
        status:"Código do produto inexistente",
      });
      if(porcentPrice(parseFloat(productInList[0].sales_price), newPrice)) return ({
        code,
        newPrice,
        status:"reajuste maior que 10%"
      });
      if(lowerPrice(parseFloat(productInList[0].cost_price), newPrice)) return ({
        code,
        newPrice,
        status:"Preço do custo maior que o enviado"
      });
      return ({code,
          newPrice,
          status: "okay"});
    });
    
    setIsValidToChange(validate.some(({ status }) => "okay" !== status));
    setValidate(validate.map(({ status }) => status));
    return validate;
};