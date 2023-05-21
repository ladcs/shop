import ProductTable from "@/components/ProductTabel";
import Header from "@/components/header";
import { IPacks } from "@/interface/IPacks";
import { MarketContext } from "@/pages/_app";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const PackTable = () => {
  const { packsList, productList } = useContext(MarketContext);
  const [packs, setPacks] = useState<IPacks[][] | []>([]);
  const tableTitle = ["codigo do pack", "produto", "quantidade", "valor do pack"];
  const route = useRouter();

  useEffect(() => {
    if(packsList.length === 0) route.push('/');
  },[]);

  const getProduct = (codeOf: number) => {
    const product = productList.filter(({ code }) => code === codeOf);
    return { name: product[0].name, price: product[0].sales_price };
  };

  const getProductName = (code: number) => {
    const { name } = getProduct(code);
    return name;
  };

  const getProductPriceInQty = (qty: number, code: number) => {
    const { price } = getProduct(code);
    return qty * price;
  };

  const getPricePack = (p: IPacks[]) => {
    return p.reduce((prev, cur) => prev + getProductPriceInQty(cur.qty, cur.product_id), 0);
  };

  useEffect(() => {
    const arrayToGetPacks = packsList.filter((pack, index, self) => self.findIndex(({ pack_id }) => pack_id === pack.pack_id) === index);
    const arrayToPacks = arrayToGetPacks.map(({ pack_id }) => packsList.filter(p => pack_id === p.pack_id));
    setPacks(arrayToPacks);
  }, [packsList]);

  return (
    <div>
      <Header />
      <ProductTable tableRow={ packsList } />
    </div>
  );
};

export default PackTable;
