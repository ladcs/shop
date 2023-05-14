import { IPackServices } from "../interface/IPackServices";
import NotFound from "../error/NotFound";
import { IPackInfo } from "../interface/IPacksInfo";
import PacksPrice from "../model/PacksPriceModel"
import { IPacks } from "../interface/IPacks";
import Packs from "../model/PacksModel";

export default class PackServices implements IPackServices {
  private prices: PacksPrice;
  private packs: Packs;

  constructor() {
    this.prices = new PacksPrice();
    this.packs = new Packs();
  }

  getAllPack = async (): Promise<IPacks[]>  => {
    return await this.packs.read();
  }

  getPackByPackId = async (packId: number): Promise<IPacks[]> => {
    const pack = await this.packs.readOne(packId);
    if (!pack) throw new NotFound("Pack does not exist");
    return pack;
  }

  getAllPackPrices = async (): Promise<IPackInfo[]> => {
    return await this.prices.read();
  }

  getPackPricesByPackId = async (packId: number): Promise<IPackInfo> => {
    const pack = await this.prices.readOne(packId);
    if(!pack) throw new NotFound("pack not exist");
    return pack;
  }


}