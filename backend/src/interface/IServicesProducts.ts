import { codeAndNewPrice } from "./ICodeNewPrice";
import { IProductNewPrice } from "./IProductNewPrice";

export interface IServicesProducts<T> {
  getAll(): Promise<T[]>,
  getOne(id: number): Promise<T | null>,
  update(obj: codeAndNewPrice): Promise<IProductNewPrice>,
}