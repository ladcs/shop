import { readCsv } from "@/lib/readCsv";

type csvType = {
  data: number[][];
  errors: [];
  meta: any;
}

export const productsInCsv = async (csvFile: File) => {
  const csv = await readCsv(csvFile) as csvType;
  const [_titles, ...products] = csv.data;
  return products;
}