import type { NextPage } from 'next';
import Button from '@components/Button';
import Layout from '@components/Layout';
import Textarea from '@components/Textarea';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useEffect } from 'react';
import { Answer, Post, User } from '@prisma/client';
import Link from 'next/link';
import useMutation from '@libs/client/useMutation';
import { cls } from '@libs/client/utils';
import { useForm } from 'react-hook-form';

interface AnswerWithUser extends Answer {
  user: User;
}

interface PostWithUser extends Post {
  user: User;
  answers: AnswerWithUser[];
  _count: {
    wonderings: number;
    answers: number;
  };
}

interface PostResponse {
  ok: boolean;
  post: PostWithUser;
  isWonder: boolean;
}
interface AnswerResponse {
  ok: boolean;
  answer: Answer;
}

interface AnswerForm {
  answer: string;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();

  const [wonder, { loading }] = useMutation(
    `/api/posts/${router.query.id}/wonder`
  );
  const [sendAnswer, { data: answerData, loading: answerLoading }] =
    useMutation<AnswerResponse>(`/api/posts/${router.query.id}/answers`);

  const { data, mutate } = useSWR<PostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );

  const { register, handleSubmit, reset } = useForm<AnswerForm>();

  const onValid = (form: AnswerForm) => {
    if (answerLoading) return;
    sendAnswer(form);
  };

  const onWonderClick = () => {
    if (!data) return;
    const toggle = data.isWonder ? -1 : 1;
    mutate(
      {
        ...data,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            wonderings: data.post._count.wonderings + toggle,
          },
        },
        isWonder: !data.isWonder,
      },
      false
    );
    if (!loading) wonder({});
  };

  useEffect(() => {
    if (data && !data.post) {
      alert('없는 게시글 입니다.');
      router.replace('/community');
    }
  }, [data, router]);

  useEffect(() => {
    if (answerData && answerData.ok) {
      reset();
      mutate();
      // 해당 게시글의 데이터를 받아온 SWR과 연결된 mutate함수를 실행시켜서 re-fetch해준다.
    }
  }, [answerData, reset, mutate]);

  return (
    <Layout tab="동네생활" canGoBack>
      <div className="pt-6">
        <span className="inline-flex ml-4 my-3 items-center px-2.5 py-0.5 rounded-full text-sm font-semibold text-gray-800 bg-gray-100">
          동네질문
        </span>
        <div className="flex items-center px-4 py-3 mb-3 space-x-3 border-b cursor-pointer">
          <div className="bg-slate-300 w-10 h-10 rounded-full" />
          <div>
            <p className="text-sm font-semibold text-gray-700">
              {data?.post?.user?.name}
            </p>
            <Link href={`/users/profiles/${data?.post?.user?.id}`}>
              <a className="text-xs font-semibold text-gray-500">
                View profile &rarr;
              </a>
            </Link>
          </div>
        </div>
        <div>
          <div className="px-4 mt-2 text-gray-700">
            <span className="font-semibold text-orange-500">Q.</span>{' '}
            {data?.post?.question}
          </div>
          <div className="flex px-4 space-x-5 mt-3 text-gray-700 text-sm py-2.5 border-t border-b-2 w-full">
            <button
              className={cls(
                'flex items-center space-x-2 transition-colors duration-300',
                data?.isWonder ? 'text-teal-600' : 'text-gray-700'
              )}
              onClick={onWonderClick}
            >
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
              <span>궁금해요 {data?.post?._count?.wonderings}</span>
            </button>
            <span className="flex items-center space-x-2">
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
              <span>답변 {data?.post?._count?.answers}</span>
            </span>
          </div>
        </div>
        <div className="px-4 my-5 space-y-5">
          {data?.post?.answers?.map((answer) => (
            <div key={answer.id} className=" flex items-start space-x-3">
              <div className="bg-slate-200 w-8 h-8 rounded-full" />
              <div>
                <span className="block text-sm font-semibold text-gray-700">
                  {answer.user.name}
                </span>
                <span className="block text-xs text-gray-500">
                  {answer.createdAt}
                </span>
                <p className="mt-2 text-gray-700">{answer.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onValid)} className="px-4 mb-5">
          <Textarea
            register={register('answer', {
              required: true,
              minLength: { value: 5, message: '5글자 이상 입력해주세요.' },
            })}
            placeholder="Answer this question!"
            required
          />
          <Button loading={answerLoading} text="Reply" />
        </form>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
