import { MarketContext } from "@/pages/_app"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useContext } from "react"

const UpdateTable = () => {
  const { changes, toNewPrices } = useContext(MarketContext);

  const tableTitle = ["Codigo", "Nome", "Preço Atual", "Novo Preço", "status"];

  return (
    <TableContainer component={Paper} className="translate-y-7">
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
              <TableCell>{ typeof item.currentPrice === "string" ?  parseFloat(item.currentPrice).toFixed(2): item.currentPrice.toFixed(2) }</TableCell>
              {/*@ts-ignore*/}
              <TableCell>{typeof item.newPrice === "string" ?  parseFloat(item.newPrice).toFixed(2) : item.newPrice.toFixed(2)}</TableCell>
              {
              toNewPrices.filter(({ code }) => item
                .code == code)[0] !== undefined ?
                <TableCell
                className={ toNewPrices.filter(({ code }) => item.code == code)[0] 
                .status === 'okay' ? "text-green-600" : "text-red-600" } 
              > 
                {toNewPrices.filter(({ code }) => item.code == code)[0].status }
              </TableCell> : <></>
              }
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default UpdateTable