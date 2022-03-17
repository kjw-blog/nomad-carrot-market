import type { NextPage } from 'next';
import Link from 'next/link';
import CreateButton from '@components/CreateButton';
import Item from '@components/Item';
import Layout from '@components/Layout';
import useUser from '@libs/client/useUser';

const Home: NextPage = () => {
  const { user, isLoading } = useUser();

  console.log(process.env.NODE_ENV);

  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col py-10 space-y-5">
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
