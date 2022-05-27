import type { NextPage } from 'next';
import Item from '@components/Item';
import Layout from '@components/Layout';
import ProductList from '@components/Product-list';

const Bought: NextPage = () => {
  return (
    <Layout tab="프로필" canGoBack title="구매내역">
      <div className="flex flex-col py-10 space-y-5">
        <ProductList kind="purchases" />
      </div>
    </Layout>
  );
};

export default Bought;
