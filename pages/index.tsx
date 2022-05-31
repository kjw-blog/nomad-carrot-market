import type { NextPage } from 'next';

import client from '@libs/server/client';

import CreateButton from '@components/CreateButton';
import Item from '@components/Item';
import Layout from '@components/Layout';
import useUser from '@libs/client/useUser';
import useSWR from 'swr';
import { Product } from '@prisma/client';
import Image from 'next/image';
import sea from '../public/sea1.jpg';
import Loading from '@components/Loading';

export interface ProductWithCount extends Product {
  _count: {
    favs: number;
  };
}

interface ProductsReponse {
  ok: boolean;
  products: ProductWithCount[];
}

const Home: NextPage<{ products: ProductWithCount[] }> = ({ products }) => {
  const { user, isLoading } = useUser();
  // const { data } = useSWR<ProductsReponse>('/api/products');

  return (
    <Layout title="홈" hasTabBar tab="홈">
      <div className="flex flex-col py-10 space-y-5">
        {products?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            item={product.name}
            price={product.price}
            hearts={product._count.favs}
            image={product.image}
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

export async function getServerSideProps() {
  const products = await client.product.findMany({
    include: {
      _count: {
        select: {
          favs: true,
        },
      },
    },
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Home;
