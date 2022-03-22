import type { NextPage } from 'next';
import CreateButton from '@components/CreateButton';
import Item from '@components/Item';
import Layout from '@components/Layout';
import useUser from '@libs/client/useUser';
import useSWR from 'swr';
import { Fav, Product } from '@prisma/client';

interface ProductWithCount extends Product {
  _count: {
    favs: number;
  };
}

interface ProductsReponse {
  ok: boolean;
  products: ProductWithCount[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductsReponse>('/api/products');

  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col py-10 space-y-5">
        {data?.products?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            item={product.name}
            price={product.price}
            hearts={product._count.favs}
          />
        ))}
        <CreateButton href="/products/upload">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </CreateButton>
      </div>
    </Layout>
  );
};

export default Home;
