import type { NextPage } from 'next';
import Layout from '@components/Layout';
import Message from '@components/Message';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Stream } from '@prisma/client';

interface StreamResponse {
  ok: true;
  stream: Stream;
}

const StreamDetail: NextPage = () => {
  const router = useRouter();

  const { data } = useSWR<StreamResponse>(
    router.query.id && `/api/streams/${router.query.id}`
  );
  return (
    <Layout canGoBack>
      <div className="px-4 py-10 space-y-4">
        <div className="bg-slate-300 aspect-video w-full rounded-md shadow-sm" />
        <div className="mt-5">
          <h1 className="mt-2 text-3xl font-semibold text-gray-900">
            {data?.stream?.name}
          </h1>
          <span className="block mt-3 text-2xl text-gray-900">
            \{data?.stream?.price}
          </span>
          <p className="my-6 text-gray-700">{data?.stream?.description}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="py-10 h-[50vh] overflow-y-scroll px-4 space-y-4 scrollbar-hide">
            <Message message="안녕하세요" />
            <Message message="네 안녕하세요" reverse />
            <Message message="상대 메세지" />
            <Message message="내 메세지" reverse />
          </div>
          <div className="bottom-2 fixed inset-x-0 w-full max-w-md mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                className="focus:ring-orange-500 focus:outline-none focus:border-orange-500 w-full pr-12 border-gray-300 rounded-full shadow-sm"
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button className="focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 hover:bg-orange-600 flex items-center px-3 text-sm font-bold text-white bg-orange-500 rounded-full">
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
