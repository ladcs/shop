import { IPackServices } from "../interface/IPackServices";
import NotFound from "../error/NotFound";
import { IPacks } from "../interface/IPacks";
import Packs from "../model/PacksModel";

export default class PackServices implements IPackServices {
  private packs: Packs;

  constructor() {
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
}