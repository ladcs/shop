import { RowDataPacket } from 'mysql2'
import { IProduct } from "../interface/IProduct";
import { IModelProduct } from "../interface/IModelProduct";
import connection from "./connection";

export default class ProductsModel implements IModelProduct<IProduct>{
  read = async (): Promise<IProduct[]> => {
    const query = 'SELECT * FROM market.products';
    const [rows] = await connection.execute(query);

    if (!Array.isArray(rows)) return rows as any as IProduct[];
    const allProducts = (rows as RowDataPacket[]).map((row: RowDataPacket) => ({
    code: row.code,
    name: row.name,
    cost_price: row.cost_price,
    sales_price: row.sales_price,
    }));

    return allProducts;
  }

  readOne = async (id: number): Promise<IProduct | null> => {
    const query = 'SELECT * FROM market.products WHERE code=?';
    const [row] = await connection.execute(query, [id]);

    if (!row) return null;
    const product = {
      code: id,
      name: (row as RowDataPacket[])[0].name,
      cost_price: (row as RowDataPacket[])[0].cost_price,
      sales_price: (row as RowDataPacket[])[0].sales_price,
    }

    return product;
  }

  update = async (obj: IProduct): Promise<IProduct | null> => {
    const {name, cost_price, sales_price, code} = obj;

    const query = (`UPDATE market.products SET name=?, cost_price=?, sales_price=?
      WHERE code=?`);
    await connection.execute(query, [name, cost_price, sales_price, code]);

    return {...obj}
  }
}