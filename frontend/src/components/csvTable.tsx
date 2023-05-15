import { MarketContext } from "@/pages/_app";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useContext } from "react";

const CsvTable = () => {
  const { validate, toNewPrices } = useContext(MarketContext);
  const tableTitle = ["código", "valor para reajuste", "status"];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            { tableTitle.map((cell, i)=> <TableCell key={i}>{cell}</TableCell>) }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            toNewPrices.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.newPrice}</TableCell>
                <TableCell>{validate[i]}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CsvTable