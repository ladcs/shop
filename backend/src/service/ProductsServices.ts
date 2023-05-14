import ProductsModel from "../model/ProductsModel";
import { IProduct } from "../interface/IProduct";
import { IServicesProducts } from "../interface/IServicesProducts";
import { IProductNewPrice } from "../interface/IProductNewPrice";
import NotFound from "../error/NotFound";
import RulesToUpdate from "../util/RulesToUpdate";
import { codeAndNewPrice } from "../interface/ICodeNewPrice";

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
    const product = await this.model.readOne(code);
    if(!product) throw new NotFound("product not found");
    return product;
  }

  update = async({ code, newPrice }: codeAndNewPrice): Promise<IProductNewPrice> => {
    const rulesToUpdate = new RulesToUpdate();
    rulesToUpdate.fieldRules(code, newPrice * 100);

    const product = await this.getOne(code);

    
    rulesToUpdate.financialTeamRule(product.cost_price, newPrice);
    rulesToUpdate.marketingTeamRule(product.sales_price, newPrice);

    const current_price = product.sales_price;
    const new_price = newPrice.toFixed(2);
    const updatedProduct = { sales_product: newPrice, ...product };
    this.model.update(updatedProduct);
    return {code, name: product.name, current_price, new_price};
  }
}