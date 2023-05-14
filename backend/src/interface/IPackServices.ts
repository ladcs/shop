import { IPacks } from "./IPacks";
import { IPackInfo } from "./IPacksInfo";

export interface IPackServices {
  getAllPackPrices() : Promise<IPackInfo[]>,
  getPackPricesByPackId(id: number): Promise<IPackInfo>,
  getAllPack(): Promise<IPacks[]>
  getPackByPackId(id: number): Promise<IPacks[]>
}