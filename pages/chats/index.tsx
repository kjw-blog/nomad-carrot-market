import type { NextPage } from 'next';
import Link from 'next/link';
import Layout from '@components/Layout';
import useSWR from 'swr';
import { ChatMessage, Chats } from '@prisma/client';
import useUser from '@libs/client/useUser';
import Image from 'next/image';
import { cfUrl } from '@libs/client/utils';

// tw css divide = 형제 요소가 있을 때 구분선을 만들어줌 ??

interface UserType {
  avatar: string | null;
  name: string;
}
interface ChatsWithOthers extends Chats {
  buyer: UserType;
  product: {
    user: UserType;
  };
  message: ChatMessage[];
}

interface ChatsType {
  ok: true;
  chats: ChatsWithOthers[];
}

const Chats: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<ChatsType>('/api/trade');

  const getUser = (chat: ChatsWithOthers, type?: string) => {
    if (type === 'name') {
      return user?.id === chat.buyerId
        ? chat.product.user.name
        : chat.buyer.name;
    } else {
      return user?.id === chat.buyerId
        ? chat.product.user.avatar
        : chat.buyer.avatar;
    }
  };

  return (
    <Layout title="채팅" hasTabBar>
      <div className="pt-6 pb-10 divide-y-[1px]">
        {data?.chats?.map((chat) => (
          <Link href={`/chats/${chat.id}`} key={chat.id}>
            <a className="last:border-b-0 flex items-center px-4 py-3 space-x-3 cursor-pointer">
              {/* <div className="bg-slate-300 w-10 h-10 rounded-full" /> */}
              {getUser(chat) === null ? (
                <div className="bg-slate-300 w-10 h-10 rounded-full" />
              ) : (
                <Image
                  src={cfUrl({ id: getUser(chat), variant: 'avatar' })}
                  className="bg-slate-300 w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                  alt="profile"
                />
              )}
              <div>
                <p className="text-gray-700">{getUser(chat, 'name')}</p>
                <p className="text-sm text-gray-500">
                  {chat.message[chat.message.length - 1].message}
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
