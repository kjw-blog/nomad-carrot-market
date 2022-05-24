import type { NextPage } from 'next';
import Layout from '@components/Layout';
import Message from '@components/Message';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import useUser from '@libs/client/useUser';
import { Chats, Message as Massages } from '@prisma/client';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';

interface User {
  avatar: string;
  name: string;
  id: number;
}

interface ChatWithAnother extends Chats {
  message: Massages[];
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

  const { register, handleSubmit } = useForm<FormType>();

  const { user } = useUser();
  const { data } = useSWR<ChatData>(
    router.query.id && `/api/trade/${router.query.id}`
  );
  const [onMessage, { loading }] = useMutation('/api/trade/message');

  const onValid = ({ chat }: FormType) => {
    if (loading) return;
    onMessage({ chat, chatId: data?.chat?.id });
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
        <Message message="Hi how much are you selling them for?" />
        <Message message="I want ￦20,000" reverse />
        <Message message="미쳤어" />
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
