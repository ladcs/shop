import { useContext, useEffect } from 'react';
import { api } from '@/lib/axios';
import { IProduct } from '@/interface/IProduct';
import { IPacks } from '@/interface/IPacks';
import { IPackInfo } from '@/interface/IPacksInfo';
import { MarketContext } from './_app';
import ProductTable from '@/components/ProductTabel';
import Header from '@/components/header';

interface props {
  products: IProduct[],
  packs: IPacks[],
  packsPrices: IPackInfo[],
}

const Upload= ({ products, packs }: props) => {
  const { setProductList, setPacksList } = useContext(MarketContext);
  useEffect(()=> {
    setProductList(products);
    setPacksList(packs);
  }, [products, packs, setProductList, setPacksList]);

  return (
    <div>
      <Header />
      <ProductTable />
    </div>
  );
};

export const getServerSideProps = async () => {
  const [productsResponse, packsResponse] = await Promise.all([
    api.get('/products'),
    api.get('/pack')
  ]);

  return {
    props: {
      products: productsResponse.data,
      packs: packsResponse.data,
    }
  }
}

export default Upload;