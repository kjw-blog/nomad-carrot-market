import type { NextPage } from "next";
import Link from "next/link";
import CreateButton from "@components/CreateButton";
import Layout from "@components/Layout";
import useSWR from "swr";
import { Post, User } from "@prisma/client";
import useCoords from "@libs/client/useCoords";

interface PostsWithUser extends Post {
  user: User;
  _count: {
    answers: number;
    wonderings: number;
  };
}

interface PostsResponse {
  ok: boolean;
  posts: PostsWithUser[];
}

const Community: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const { data } = useSWR<PostsResponse>(
    latitude && longitude
      ? `/api/posts?latitude=${latitude}&longitude=${longitude}`
      : null
  );

  return (
    <Layout title="동네생활" hasTabBar>
      <div className="py-10 space-y-8">
        {data?.posts?.map((post) => (
          <Link href={`/community/${post.id}`} key={post.id}>
            <a className=" flex flex-col items-start cursor-pointer">
              <span className="flex items-center ml-4 px-2.5 py-0.5 rounded-full text-xs font-semibold text-gray-800 bg-gray-100 ">
                동네질문
              </span>
              <div className=" px-4 mt-2 text-gray-700">
                <span className="font-semibold text-orange-500">Q. </span>
                {post.question}
              </div>
              <div className=" text-gray-500px-4 flex items-center justify-between w-full px-4 mt-5 text-sm">
                <span>{post.user.name}</span>
                <span>{post.createdAt}</span>
              </div>
              <div className="flex space-x-5 mt-3 text-gray-700 text-sm py-2.5 border-t border-b-2 w-full px-4 ">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>궁금해요 {post._count.wonderings}</span>
                </span>
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
                  <span>답변 {post._count.answers}</span>
                </span>
              </div>
            </a>
          </Link>
        ))}

        <CreateButton href="/community/write">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </CreateButton>
      </div>
    </Layout>
  );
};

export default Community;
