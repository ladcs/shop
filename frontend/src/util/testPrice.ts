export const lowerPrice = (costPrice: number, newPrice: number) => {
  if(costPrice > newPrice) return true;
  return false;
}

export const porcentPrice = (currentPrice: number, newPrice: number) => {
  if(currentPrice * 0.9 > newPrice || currentPrice * 1.1 < newPrice) return true;
  return false;
}