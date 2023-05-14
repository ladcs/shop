import { IModelPacks } from "../interface/IModelPacks";
import { IPackInfo } from "../interface/IPacksInfo";
import connection from "./connection";
import { RowDataPacket } from "mysql2";

export default class PacksPrice implements IModelPacks<IPackInfo> {
  read = async (): Promise<IPackInfo[]> => {
    const query = (`SELECT packs.pack_id,
    SUM(packs.qty * products.sales_price) AS price
    FROM market.packs AS packs
    INNER JOIN market.products AS products
    ON packs.product_id = products.code
    GROUP BY pack_id;`);
    const [rows] = await connection.execute(query);

    if (!Array.isArray(rows)) return rows as any as IPackInfo[];
    const allPacks = (rows as RowDataPacket[]).map((row: RowDataPacket) => ({
    pack_id: row.pack_id,
    price: row.price,
    }));

    return allPacks;
  }


  readOne = async(pack_id: number): Promise<IPackInfo | null> => {
    const query = (`SELECT packs.pack_id,
    SUM(packs.qty * products.sales_price) AS price
    FROM market.packs AS packs
    INNER JOIN market.products AS products
    ON packs.product_id = products.code
    WHERE pack_id = ?
    GROUP BY pack_id;`);
    const [row] = await connection.execute(query, [pack_id]);

    if (!(row as RowDataPacket[])[0]) return null;
    const pack = {
      pack_id: (row as RowDataPacket[])[0].pack_id,
      price: (row as RowDataPacket[])[0].price,
    }

    return pack;
  }
}