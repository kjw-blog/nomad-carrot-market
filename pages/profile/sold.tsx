import type { NextPage } from 'next';
import Item from '../../components/Item';
import Layout from '../../components/Layout';

const Sold: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="flex flex-col space-y-5 py-10">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            item="iPhone 10"
            comments={1}
            hearts={1}
            id={i}
            item_detail="Black"
            price={9500}
            key={i}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Sold;
