import { IProduct } from "@/interface/IProduct";
import { readCsv } from "@/lib/readCsv";
import { Dispatch, SetStateAction } from "react";
import { lowerPrice, porcentPrice } from "./testPrice";

type csvType = {
  data: number[][];
  errors: [];
  meta: any;
}

type toValidate = {
  productList: IProduct[];
  setIsValidToChange: Dispatch<SetStateAction<boolean>>;
  setValidate: Dispatch<SetStateAction<string[]>>;
  csvFile: File | null;
}

export const validatedButton = async ({productList, setIsValidToChange, csvFile, setValidate}: toValidate) => {
  if (csvFile) {
    const csv = await readCsv(csvFile) as csvType;
    const [_titles, ...products] = csv.data;
    const validate = products.map((product) => {
      if(!product[0] || !product[1]) return "Um campo faltante";
      if (typeof product[1] === "number") {
        if(product[1] * 100 % 1 !== 0) return "preço inválido, tem que ter o formato R.CC";
      }
      const productInList = productList.filter((p) => p.code == product[0]);
      if(productInList.length === 0) return "Código do produto inexistente";
      if(lowerPrice(productInList[0].cost_price, product[1])) return "Preço do custo menor que o enviado";
      if(porcentPrice(productInList[0].sales_price, product[1])) return "reajuste maior que 10%";
      return "okay";
    });
    console.log(validate);
    
    setIsValidToChange(validate.some(okay => "okay" !== okay));
    setValidate(validate);
  }
};