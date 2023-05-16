import { IPacks } from "./IPacks";

export interface IPackServices {
  getAllPack(): Promise<IPacks[]>
  getPackByPackId(id: number): Promise<IPacks[]>
}