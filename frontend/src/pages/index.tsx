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
}

const Upload= ({ products, packs }: props) => {
  const { setProductList, productList, setPacksList } = useContext(MarketContext);
  useEffect(()=> {
    const packsCode = Array.from(new Set(packs.map(pack => pack.pack_id)));
    const packsInProducts = products.filter(pack => packsCode.includes(pack.code));
    const onlyProducts = products.filter(pack => !packsCode.includes(pack.code));
    setProductList(onlyProducts);
    setPacksList(packsInProducts);
  }, [products, packs]);

  return (
    <div>
      <Header />
      <ProductTable tableRow={productList} />
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