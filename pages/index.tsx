import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  const setPage = (link: string) => {
    router.push(link);
  };

  return (
    <div className="flex flex-col items-center space-y-20">
      <div
        onClick={() => setPage('/cards')}
        className="py-5 px-20 shadow-lg cursor-pointer hover:bg-teal-200 transition mt-72 group"
      >
        <span className={`font-bold  transition group-hover:text-white`}>
          카드
        </span>
      </div>
      <div
        onClick={() => setPage('/files')}
        className="py-5 px-20 shadow-lg cursor-pointer hover:bg-indigo-200 transition group"
      >
        <span>
          <a className="font-bold transition group-hover:text-white">파일</a>
        </span>
      </div>
      <div
        onClick={() => setPage('/forms')}
        className="py-5 px-20 shadow-lg cursor-pointer hover:bg-purple-200 transition group"
      >
        <span>
          <a className="font-bold transition group-hover:text-white">인풋</a>
        </span>
      </div>
    </div>
  );
};

export default Home;
