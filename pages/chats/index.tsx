import type { NextPage } from 'next';
import Layout from '../../components/Layout';

// tw css divide = 형제 요소가 있을 때 구분선을 만들어줌 ??

const Chats: NextPage = () => {
  return (
    <Layout title="채팅" hasTabBar>
      <div className="py-6 divide-y-[1px]">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <div
            key={i}
            className="cursor-pointer px-4 flex space-x-3 items-center py-3 last:border-b-0"
          >
            <div className="h-10 w-10 bg-slate-300 rounded-full" />
            <div>
              <p className="text-gray-700">Steve Jebs</p>
              <p className="text-sm text-gray-500">
                See you tomorrow in the corner at 2pm!
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
