import type { NextPage } from 'next';
import Item from '@components/Item';
import Layout from '@components/Layout';

const Sold: NextPage = () => {
  return (
    <Layout canGoBack title="판매내역">
      <div className="flex flex-col py-10 space-y-5">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item item="iPhone 10" hearts={1} id={i} price={9500} key={i} />
        ))}
      </div>
    </Layout>
  );
};

export default Sold;
