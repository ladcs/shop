import { RowDataPacket } from "mysql2";
import { IModelPacks } from "../interface/IModelPacks";
import { IPacks } from "../interface/IPacks";
import connection from "./connection";

export default class Packs implements IModelPacks<IPacks>{
  read = async (): Promise<IPacks[]> => {
    const query = "SELECT * FROM market.packs;";
    const [rows] = await connection.execute(query);

    if(!Array.isArray(rows)) return rows as any as IPacks[];
    const packs = (rows as RowDataPacket[]).map((row) => ({
      id: row.id,
      pack_id: row.pack_id,
      product_id: row.product_id,
      qty: row.qty,
    }));

    return packs;
  }
  readOne = async (id: number): Promise<IPacks | null> => {
    const query = "SELECT * FROM market.packs WHERE id=?;";
    const [row] = await connection.execute(query, [id]);

    if (!row) return null;
    const pack = {
      id,
      pack_id: (row as RowDataPacket[])[0].pack_id,
      product_id: (row as RowDataPacket[])[0].product_id,
      qty: (row as RowDataPacket[])[0].qty,
    }

    return pack;
  }

}