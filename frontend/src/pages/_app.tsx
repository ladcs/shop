import { IPacks } from '@/interface/IPacks';
import { IProduct } from '@/interface/IProduct';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type marketContext = {
  csvFile: File | null;
  setCsvFile: (e: File | null) => void;
  productList: IProduct[] | [];
  setProductList: (e: IProduct[] | []) => void;
  packsList: IPacks[] | [];
  setPacksList: (e: IPacks[] | []) => void;
  validate: string[] | [];
  setValidate: Dispatch<SetStateAction<string[]>>;
};

const contextDefault: marketContext = {
  csvFile: null,
  setCsvFile: (e) => {},
  productList: [],
  setProductList: (e) => {},
  packsList: [],
  setPacksList: (e) => {},
  validate: [],
  setValidate: (e) => {},
};

export const MarketContext = createContext<marketContext>(contextDefault);

type Props = {
  children: ReactNode;
};

function MarketProvider({ children }: Props) {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [productList, setProductList] = useState<IProduct[] | []>([]);
  const [packsList, setPacksList] = useState<IPacks[] | []>([]);
  const [validate, setValidate] = useState<string[]>([]);
  const value = {
    csvFile,
    setCsvFile,
    productList,
    setProductList,
    packsList,
    setPacksList,
    validate,
    setValidate,
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