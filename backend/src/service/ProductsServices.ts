import ProductsModel from "../model/ProductsModel";
import { IProduct } from "../interface/IProduct";
import { IServicesProducts } from "../interface/IServicesProducts";
import { IProductNewPrice } from "../interface/IProductNewPrice";
import NotFound from "../error/NotFound";
import RulesToUpdate from "../util/RulesToUpdate";

export default class ProductsServices implements IServicesProducts<IProduct> {
  private model: ProductsModel;
  constructor() {
    this.model = new ProductsModel();
  }
  
  getAll = async (): Promise<IProduct[]> => {
    const products = this.model.read();
    return products;
  }

  getOne = async (code: number): Promise<IProduct> => {
    const product = this.getOne(code);
    if(!product) throw new NotFound("product not found");
    return product;
  }

  update = async(code: number, newPrice: number): Promise<IProductNewPrice> => {
    const rulesToUpdate = new RulesToUpdate();
    rulesToUpdate.fieldRules(code, newPrice);
    const product = await this.getOne(code);
    rulesToUpdate.financialTeamRule(product.cost_price, newPrice);
    rulesToUpdate.marketingTeamRule(product.sales_price, newPrice);
    const currentPrice = product.sales_price;
    const updatedProduct = { sales_product: newPrice, ...product };
    this.model.update(updatedProduct);
    return {code, name: product.name, current_price: currentPrice, new_price: newPrice};
  }
}