import { IProductNewPrice } from "./IProductNewPrice";

export interface IServicesProducts<T> {
  getAll(): Promise<T[]>,
  getOne(id: number): Promise<T>,
  update(code: number, newPrice: number): Promise<IProductNewPrice>,
}