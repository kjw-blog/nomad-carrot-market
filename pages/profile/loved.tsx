import type { NextPage } from 'next';
import Item from '@components/Item';
import Layout from '@components/Layout';

const Loved: NextPage = () => {
  return (
    <Layout canGoBack title="관심목록">
      <div className="flex flex-col py-10 space-y-5">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item item="갤럭시워치" hearts={1} id={i} price={9500} key={i} />
        ))}
      </div>
    </Layout>
  );
};

export default Loved;
