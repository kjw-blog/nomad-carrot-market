import type { NextPage } from 'next';
import Layout from '../../components/Layout';

const CommunityPostDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="pt-6">
        <span className="inline-flex ml-4 my-3 items-center px-2.5 py-0.5 rounded-full text-sm font-semibold text-gray-800 bg-gray-100">
          동네질문
        </span>
        <div className="cursor-pointer px-4 mb-3 flex space-x-3 items-center py-3 border-b">
          <div className="h-10 w-10 bg-slate-300 rounded-full" />
          <div>
            <p className="text-sm font-semibold text-gray-700">Steve Jebs</p>
            <p className="text-xs font-semibold text-gray-500">
              View profile &rarr;
            </p>
          </div>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="text-orange-500 font-semibold">Q.</span> What is
            the best mandu restaurant?
          </div>
          <div className="flex px-4 space-x-5 mt-3 text-gray-700 text-sm py-2.5 border-t border-b-2 w-full">
            <span className="flex space-x-2 items-center">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>궁금해요 1</span>
            </span>
            <span className="flex space-x-2 items-center">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 1</span>
            </span>
          </div>
        </div>
        <div className="px-4 my-5 space-y-5">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-start space-x-3 ">
              <div className="w-8 h-8 bg-slate-200 rounded-full" />
              <div>
                <span className="text-sm font-semibold block text-gray-700">
                  Steve Jebs
                </span>
                <span className="text-xs text-gray-500 block">2시간 전</span>
                <p className="text-gray-700 mt-2">
                  The best mandu restaurant is the one next to my house.
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 mb-5">
          <textarea
            rows={4}
            placeholder="Answer this question!"
            className="mt-1 shadow-sm w-full transition focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
          />
          <button className="bg-orange-500 w-full hover:bg-orange-600 transition text-white py-2 px-4 border border-transparent rounded-md mt-2 shadow-sm font-semibold text-sm focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
            Reply
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
