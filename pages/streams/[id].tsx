import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import Message from '../../components/Message';

const StreamDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="py-10 px-4 space-y-4">
        <div className="w-full bg-slate-300 aspect-video rounded-md shadow-sm" />
        <h3 className="text-gray-800 font-semibold text-xl mt-2">
          Let&apos;s try potatos
        </h3>
        <div className="py-10 h-[50vh] overflow-y-scroll px-4 space-y-4 scrollbar-hide">
          <Message message="안녕하세요" />
          <Message message="네 안녕하세요" reverse />
          <Message message="상대 메세지" />
          <Message message="내 메세지" reverse />
        </div>
        <div className="fixed w-full mx-auto max-w-md bottom-2 inset-x-0">
          <div className="flex items-center relative">
            <input
              type="text"
              className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none focus:border-orange-500 pr-12"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full hover:bg-orange-600 text-white px-3 text-sm font-bold">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
