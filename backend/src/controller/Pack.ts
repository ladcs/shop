import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import PackServices from "../service/PackServices";

export default class PackController {

  private service: PackServices;

  constructor() {
    this.service = new PackServices();
  }
  
  getAllPack = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const packs = await this.service.getAllPack();
      return res.status(StatusCodes.OK).json(packs);
    } catch (error) {
      next(error);
    }
  };

  getOnePackByPackId = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { packId } = req.params;
      const pack = await this.service.getPackByPackId(parseInt(packId));
      return res.status(StatusCodes.OK).json(pack);
    } catch (error) {
      next(error);
    }
  };
}