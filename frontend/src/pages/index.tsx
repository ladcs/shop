import { useContext, useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import { IProduct } from '@/interface/IProduct';
import { IPacks } from '@/interface/IPacks';
import { MarketContext } from './_app';
import ProductTable from '@/components/ProductTabel';
import Header from '@/components/header';

interface props {
  products: IProduct[],
  packs: IPacks[],
}

const Products = ({ products, packs }: props) => {
  const { setPacksInfo, setAllProducts, setPacksCode } = useContext(MarketContext);
  const [productList, setProductList] = useState<IProduct[] | []>([]);
  const [packsList, setPacksList] = useState<IProduct[] | []>([]);
  const [isProduct, setIsProduct] = useState<boolean>(true);
  useEffect(()=> {
    const packsCode = Array.from(new Set(packs.map(pack => pack.pack_id)));
    const packsInProducts = products.filter(pack => packsCode.includes(pack.code));
    const onlyProducts = products.filter(pack => !packsCode.includes(pack.code));
    setPacksCode(packsCode);
    setPacksInfo(packs);
    setAllProducts(products);
    setProductList(onlyProducts);
    setPacksList(packsInProducts);
  }, [products, packs]);

  return (
    <div>
      <Header />
      <button onClick={() => setIsProduct(!isProduct)}>{isProduct ? 'Lista de Packs': 'Lista de Produtos'}</button>
      <ProductTable tableRow={isProduct ? productList : packsList} />
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

export default Products ;