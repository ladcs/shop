import { MarketContext } from "@/pages/_app";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useContext } from "react";

const CsvTable = () => {
  const { toNewPrices } = useContext(MarketContext);
  
  return (
    <TableContainer component={Paper} className="translate-y-7">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Codigo</TableCell>
            <TableCell>Valor Para Reajuste</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            toNewPrices.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.newPrice}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CsvTable