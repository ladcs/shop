import { MarketContext } from '@/pages/_app';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useContext } from 'react';

const ProductTable = () => {
  const { productList } = useContext(MarketContext);
  const productTableTitle = ["código", "nome", "preço de custo", "preço de venda"];
  const keysProductsList = Object.keys(productList[0]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            { productTableTitle.map((cell, i) => <TableCell key={i}>{cell}</TableCell>) }
          </TableRow>
        </TableHead>
        <TableBody>
          { productList.map(product => (
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