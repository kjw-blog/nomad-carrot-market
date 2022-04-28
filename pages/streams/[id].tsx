import type { NextPage } from 'next';
import Layout from '@components/Layout';
import Message from '@components/Message';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Message as Messages, Stream, User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import useUser from '@libs/client/useUser';
import { useEffect } from 'react';

interface MessagesWithUser extends Messages {
  id: number;
  message: string;
  user: {
    avatar?: string;
    id: number;
  };
}

interface StreamWithMessages extends Stream {
  messages: MessagesWithUser[];
}

interface StreamResponse {
  ok: true;
  stream: StreamWithMessages;
}
interface MessageForm {
  message: string;
}

const StreamDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { data, mutate } = useSWR<StreamResponse>(
    router.query.id && `/api/streams/${router.query.id}`,
    {
      refreshInterval: 1000,
    }
  );
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/streams/${router.query.id}/message`
  );

  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              { id: Date.now(), message: form.message, user: { ...user } },
            ],
          },
        } as any),
      false
    );
    sendMessage(form);
  };

  if (!data) return <></>;

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
            {data?.stream?.messages?.map((message) => (
              <Message
                key={message.id}
                message={message.message}
                reverse={user?.id === message.user.id}
              />
            ))}
          </div>
          <div className="bottom-2 fixed inset-x-0 w-full max-w-md mx-auto">
            <form
              onSubmit={handleSubmit(onValid)}
              className="relative flex items-center"
            >
              <input
                {...register('message', { required: true })}
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
      </div>
    </Layout>
  );
};

export default StreamDetail;
