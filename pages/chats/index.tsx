import type { NextPage } from 'next';
import Link from 'next/link';
import Layout from '@components/Layout';
import useSWR from 'swr';

// tw css divide = 형제 요소가 있을 때 구분선을 만들어줌 ??

const Chats: NextPage = () => {
  const { data } = useSWR('/api/trade');

  return (
    <Layout title="채팅" hasTabBar>
      <div className="pt-6 pb-10 divide-y-[1px]">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Link href={`/chats/${i}`} key={i}>
            <a
              key={i}
              className="last:border-b-0 flex items-center px-4 py-3 space-x-3 cursor-pointer"
            >
              <div className="bg-slate-300 w-10 h-10 rounded-full" />
              <div>
                <p className="text-gray-700">Steve Jebs</p>
                <p className="text-sm text-gray-500">
                  See you tomorrow in the corner at 2pm!
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
