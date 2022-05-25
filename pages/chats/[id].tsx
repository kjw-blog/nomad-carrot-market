import type { NextPage } from 'next';
import Layout from '@components/Layout';
import Message from '@components/Message';
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/router';
import useUser from '@libs/client/useUser';
import { ChatMessage, Chats } from '@prisma/client';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';

interface User {
  avatar: string;
  name: string;
  id: number;
}

interface ChatWithAnother extends Chats {
  message: {
    message: string;
    userId: number;
    id: number;
  }[];
  product: {
    user: User;
  };
  buyer: User;
}

interface ChatData {
  ok: boolean;
  chat: ChatWithAnother;
}

interface FormType {
  chat: string;
}

const ChatDetail: NextPage = () => {
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FormType>();

  const { user } = useUser();
  const { data, mutate } = useSWR<ChatData>(
    router.query.id && `/api/trade/${router.query.id}`
  );
  const [onMessage, { loading }] = useMutation('/api/trade/message');

  const onValid = ({ chat }: FormType) => {
    if (!chat || loading) return;

    mutate(
      (prev) =>
        prev && {
          ...prev,
          chat: {
            ...prev.chat,
            message: [
              ...prev.chat.message,
              {
                id: Date.now(),
                message: chat,
                userId: user?.id || 0,
              },
            ],
          },
        },
      false
    );

    onMessage({ chat, chatId: data?.chat?.id });
    reset();
  };
  const getAvatar = (me: boolean): string => {
    if (data?.chat.buyer.id === user?.id) {
      if (me) return data?.chat.buyer.avatar || '';
      else return data?.chat.product.user.avatar || '';
    } else {
      if (me) return data?.chat.product.user.avatar || '';
      else return data?.chat.buyer.avatar || '';
    }
  };

  return (
    <Layout
      canGoBack
      title={
        user?.id === data?.chat?.buyer?.id
          ? data?.chat?.product?.user?.name
          : data?.chat?.buyer?.name
      }
    >
      <div className="px-4 py-10 space-y-4">
        {data?.chat?.message?.map((m) => {
          if (m.userId === user?.id) {
            return (
              <Message
                key={m.id}
                message={m.message}
                avatarUrl={getAvatar(true)}
                reverse
              />
            );
          } else {
            return (
              <Message
                key={m.id}
                avatarUrl={getAvatar(false)}
                message={m.message}
              />
            );
          }
        })}
        <div className="bottom-2 fixed inset-x-0 w-full max-w-md mx-auto">
          <form
            onSubmit={handleSubmit(onValid)}
            className="relative flex items-center"
          >
            <input
              {...register('chat')}
              type="text"
              className="focus:ring-orange-500 focus:outline-none focus:border-orange-500 w-full pr-12 border-gray-300 rounded-full shadow-sm"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 hover:bg-orange-600 flex items-center px-3 text-sm font-bold text-white bg-orange-500 rounded-full">
                &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
