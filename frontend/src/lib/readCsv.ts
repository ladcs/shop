import { parse } from "papaparse";

export const readCsv = async (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if(e.target) {
        const result = e.target.result as string;
        const data = parse(result, { delimiter: ',', skipEmptyLines: true});
        resolve(data);
      } else {
        reject(new Error('Error reading file.'));
      };

      reader.onerror = () => {
        reject(new Error('Error reading file.'));
      };

    };

    reader.readAsText(file);
  });
}