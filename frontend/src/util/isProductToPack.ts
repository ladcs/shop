import { IPacks } from "@/interface/IPacks";
import { IProduct } from "@/interface/IProduct";

interface typeParams {
  packsInfo: IPacks[];
  productCode: number;
  newPrice: number;
  allProducts: IProduct[];
}

interface newPricePackReturn {
  code: number;
  price: number;
}

export function newPricePack({ packsInfo, productCode, newPrice, allProducts }: typeParams): newPricePackReturn[] | null {
  const packs = isProductInPack(packsInfo, productCode);
  if(packs.length <= 0) return null;
  const codeAndPrice = packs.map((p) => {
    const fullPack = allItensInPack(packsInfo, p.pack_id);
    const prices = fullPack.map(({ product_id, qty }) => {
      if(productCode !== product_id) {
        const price = allProducts.filter(({ sales_price })=> sales_price)[0].sales_price
        return {qty, price };
      }
      return {qty, price: `${newPrice}`};
    });
    const updatedPrice = prices.reduce((acc, cur) => acc + priceOfOneItem(cur.qty, cur.price), 0)
    return {
      code: p.pack_id,
      price: updatedPrice,
    }
  });
  return codeAndPrice;
}

const isProductInPack = (packsInfo: IPacks[], productCode: number): IPacks[] => {
  return packsInfo.filter(({ product_id }) => product_id === productCode);
}

const allItensInPack = (packsInfo: IPacks[], packCode: number): IPacks[] => {
  return packsInfo.filter(({ pack_id }) => pack_id === packCode);
}

const priceOfOneItem = (qty: number, price: string) => {
  return qty * parseFloat(price);
}