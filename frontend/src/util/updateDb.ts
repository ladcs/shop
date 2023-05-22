import { api } from "@/lib/axios";

export const updateDb = async (toNewPrices:  [] | NewPrices[]) => {
  try {
    await Promise.all(
      toNewPrices.map(async ({ code, newPrice }) => {
        api.patch(`products/${code}`, { newPrice: parseFloat(newPrice) * 100 });
      })
    );
  } catch (error) {
    console.log(error);
  }
}