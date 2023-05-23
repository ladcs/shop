import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { IProduct } from '@/interface/IProduct';

interface prop {
  tableRow: IProduct[];
}

const ProductTable = ({ tableRow }: prop) => {
  const tableTitle = ["código", "nome", "preço de custo", "preço de venda"];

  return (
    <TableContainer component={Paper} className='translate-y-6'>
      <Table>
        <TableHead>
          <TableRow>
            { tableTitle.map((cell, i) => <TableCell key={i}>{cell}</TableCell>) }
          </TableRow>
        </TableHead>
        <TableBody>
          { tableRow.map(product => (
            <TableRow key={product.code}>
              <TableCell>{product.code}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.cost_price}</TableCell>
              <TableCell>{product.sales_price}</TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductTable;