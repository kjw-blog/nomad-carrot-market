import type { NextPage } from 'next';
import Link from 'next/link';
import CreateButton from '@components/CreateButton';

import Layout from '@components/Layout';
import useSWR from 'swr';
import { Stream } from '@prisma/client';

interface StreamsResponse {
  ok: true;
  streams: Stream[];
}

/**
 * 강의 후반에 페이지 수정 강의가 없으면 무한 스크롤로 페이지를 변경하거나
 * 이전 페이지에 덧붙이는 형태로 수정해보기
 */

const Streams: NextPage = () => {
  const { data } = useSWR<StreamsResponse>('/api/streams?page=1 ');

  return (
    <Layout title="라이브" hasTabBar>
      <div className="pt-12 pb-16 space-y-4 divide-y-2">
        {data?.streams?.map((stream) => (
          <Link key={stream.id} href={`/streams/${stream.id}`}>
            <a className="block px-4 pt-4 cursor-pointer">
              <div className="bg-slate-300 aspect-video w-full rounded-md shadow-sm" />
              <h3 className="mt-2 text-lg font-semibold text-gray-700">
                {stream.name}
              </h3>
            </a>
          </Link>
        ))}

        <CreateButton href="/streams/create">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </CreateButton>
      </div>
    </Layout>
  );
};

export default Streams;
