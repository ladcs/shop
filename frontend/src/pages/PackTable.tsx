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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {tableTitle.map((cell, i) => (
                <TableCell key={i}>{cell}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {packs.map((p) =>
              p.map((row, i) => (
                <TableRow key={i}>
                  {i === 0 ? (
                    <TableCell>{row.pack_id}</TableCell>
                  ) : (
                    <TableCell></TableCell>
                  )}
                  <TableCell>{getProductName(row.product_id)}</TableCell>
                  <TableCell>{row.qty}</TableCell>
                  {i === 0 ? (
                    <TableCell>
                      {getPricePack(p).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                  ) : (
                    <TableCell></TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PackTable;
