import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ProductsServices from "../service/ProductsServices";

export default class ProductsController {

  private service: ProductsServices;

  constructor() {
    this.service = new ProductsServices();
  }
  
  getAllProducts = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const products = await this.service.getAll();
      return res.status(StatusCodes.OK).json(products);
    } catch (error) {
      next(error);
    }
  };

  getOneProductByCode = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { code } = req.params;
      const product = await this.service.getOne(parseInt(code));
      return res.status(StatusCodes.OK).json(product);
    } catch (error) {
      next(error);
    }
  };

  updatedPrice = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { code:stringCode } = req.params;
      const code = parseInt(stringCode);
      const { newPrice } = req.body;
      const product = await this.service.update({ code, newPrice });
      return res.status(StatusCodes.OK).json(product);
    } catch (error) {
      next(error);
    }
  }
}