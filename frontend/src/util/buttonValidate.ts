import { IProduct } from "@/interface/IProduct";
import { readCsv } from "@/lib/readCsv";
import { Dispatch, SetStateAction } from "react";
import { lowerPrice, porcentPrice } from "./testPrice";

type csvType = {
  data: number[][];
  errors: [];
  meta: any;
}

type NewPrices = {
  code: number;
  newPrice: number;
  status: string;
}


type toValidate = {
  productList: IProduct[];
  setIsValidToChange: Dispatch<SetStateAction<boolean>>;
  setValidate: Dispatch<SetStateAction<string[]>>;
  csvFile: File | null;
  setToNewPrices: Dispatch<SetStateAction<NewPrices[] | []>>;
}

export const validatedButton = async ({productList, setIsValidToChange, csvFile, setValidate, setToNewPrices}: toValidate) => {
  if (csvFile) {
    const csv = await readCsv(csvFile) as csvType;
    const [_titles, ...products] = csv.data;
    const validate = products.map((product) => {
      if(!product[0] || !product[1]) return ({
        code: product[0],
        newPrice: product[1],
        status: "Um campo faltante",
      });
      if (typeof product[1] === "number") {
        if(product[1] * 100 % 1 !== 0) return ({
          code: product[0],
          newPrice: product[1],
          status: "preço inválido, tem que ter o formato R.CC",
        });
      }
      const productInList = productList.filter((p) => p.code == product[0]);
      if(productInList.length === 0) return ({
        code: product[0],
        newPrice: product[1],
        status:"Código do produto inexistente",
      });
      if(porcentPrice(productInList[0].sales_price, product[1])) return ({
        code: product[0],
        newPrice: product[1],
        status:"reajuste maior que 10%"
      });
      if(lowerPrice(productInList[0].cost_price, product[1])) return ({
        code: product[0],
        newPrice: product[1],
        status:"Preço do custo maior que o enviado"
      });
      return ({code: product[0],
          newPrice: product[1],
          status: "okay"});
    });
    
    setToNewPrices(validate)
    setIsValidToChange(validate.some(({ status }) => "okay" !== status));
    setValidate(validate.map(({ status }) => status));
  } else {
    setIsValidToChange(true);
  }
};