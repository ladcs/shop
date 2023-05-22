import { IPacks } from '@/interface/IPacks';
import { IProduct } from '@/interface/IProduct';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type NewPrices = {
  code: string;
  newPrice: string;
  status?: string;
}

type marketContext = {
  packsCode: number[] |[];
  setPacksCode: Dispatch<SetStateAction<number[] | []>>;
  packsInfo: IPacks[] | [];
  setPacksInfo: Dispatch<SetStateAction<IPacks[] | []>>;
  csvFile: File | null;
  setCsvFile: Dispatch<SetStateAction<File | null>>;
  allProducts: IProduct[] | [];
  setAllProducts: Dispatch<SetStateAction<IProduct[] | []>>;
  validate: string[] | [];
  setValidate: Dispatch<SetStateAction<string[]>>;
  toNewPrices: NewPrices[] | [],
  setToNewPrices: Dispatch<SetStateAction<NewPrices[] | []>>;
  changes: Changes[] | [];
  setChanges: Dispatch<SetStateAction<Changes[] | []>>;
  isValid: boolean;
  setIsValid: Dispatch<SetStateAction<boolean>>;
};

const contextDefault: marketContext = {
  packsCode: [],
  setPacksCode: (e) => {},
  packsInfo: [],
  setPacksInfo: (e) => {},
  csvFile: null,
  setCsvFile: (e) => {},
  allProducts: [],
  setAllProducts: (e) => {},
  validate: [],
  setValidate: (e) => {},
  toNewPrices: [],
  setToNewPrices: (e) => {},
  changes: [],
  setChanges: (e) => {},
  isValid: false,
  setIsValid: (e) => {},
};

export const MarketContext = createContext<marketContext>(contextDefault);

type Props = {
  children: ReactNode;
};

function MarketProvider({ children }: Props) {
  const [packsCode, setPacksCode] = useState<number[] | []>([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [allProducts, setAllProducts] = useState<IProduct[] | []>([]);
  const [packsList, setPacksList] = useState<IProduct[] | []>([]);
  const [validate, setValidate] = useState<string[]>([]);
  const [toNewPrices, setToNewPrices] = useState<NewPrices[] |[]>([]);
  const [changes, setChanges] = useState<Changes[] | []>([]);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [packsInfo, setPacksInfo] = useState<IPacks[] | []>([]);

  const value = {
    packsCode,
    setPacksCode,
    packsInfo,
    setPacksInfo,
    toNewPrices,
    setToNewPrices,
    csvFile,
    setCsvFile,
    allProducts,
    setAllProducts,
    packsList,
    setPacksList,
    validate,
    setValidate,
    changes,
    setChanges,
    isValid,
    setIsValid,
  };

  return (
    <MarketContext.Provider value={value}>
      {children}
    </MarketContext.Provider>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MarketProvider>
      <Component {...pageProps} />
    </MarketProvider>
  )
}