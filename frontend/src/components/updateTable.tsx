import { MarketContext } from "@/pages/_app"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useContext } from "react"

const UpdateTable = () => {
  const { changes } = useContext(MarketContext);
  const tableTitle = ["Codigo", "Nome", "Preço Atual", "Novo Preço"];

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
          changes.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.currentPrice.toFixed(2)}</TableCell>
              <TableCell>{item.newPrice.toFixed(2)}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default UpdateTable