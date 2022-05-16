import type { NextPage } from 'next';
import Link from 'next/link';
import useSWR from 'swr';
import { Review, User } from '@prisma/client';

import useUser from '@libs/client/useUser';
import { cfUrl, cls } from '@libs/client/utils';
import Layout from '@components/Layout';

interface ReviewWithUser extends Review {
  createdBy: User;
}

interface ReviewResponse {
  ok: boolean;
  reviews: ReviewWithUser[];
}

const Profile: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<ReviewResponse>('/api/reviews');

  return (
    <Layout title="나의 캐럿" hasTabBar>
      <div className="px-4 py-10">
        <div className="flex items-center space-x-4">
          {user?.avatar ? (
            <img
              src={cfUrl({ id: user.avatar, variant: 'avatar' })}
              className="bg-slate-400 w-16 h-16 rounded-full"
            />
          ) : (
            <div className="bg-slate-400 w-16 h-16 rounded-full" />
          )}

          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">{user?.name}</span>
            <Link href="/profile/edit">
              <a className="text-sm text-gray-700 cursor-pointer">
                Edit profile &rarr;
              </a>
            </Link>
          </div>
        </div>
        <div className="flex justify-around mt-10">
          <Link href="/profile/sold">
            <a className="group flex flex-col items-center cursor-pointer">
              <div className="w-14 h-14 group-hover:bg-orange-600 flex items-center justify-center text-white transition-colors bg-orange-500 rounded-full">
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <span className="mt-2 text-sm font-semibold text-gray-700">
                판매내역
              </span>
            </a>
          </Link>
          <Link href="/profile/bought">
            <a className="group flex flex-col items-center cursor-pointer">
              <div className="w-14 h-14 group-hover:bg-orange-600 flex items-center justify-center text-white transition-colors bg-orange-500 rounded-full">
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
              <span className="mt-2 text-sm font-semibold text-gray-700">
                구매내역
              </span>
            </a>
          </Link>
          <Link href="/profile/loved">
            <a className="group flex flex-col items-center cursor-pointer">
              <div className="w-14 h-14 group-hover:bg-orange-600 flex items-center justify-center text-white transition-colors bg-orange-500 rounded-full">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <span className="mt-2 text-sm font-semibold text-gray-700">
                관심목록
              </span>
            </a>
          </Link>
        </div>
        {data?.reviews?.map((review) => (
          <div key={review.id} className="mt-12">
            <div className="flex items-center space-x-4">
              <div className="bg-slate-400 w-12 h-12 rounded-full" />
              <div>
                <h4 className="text-sm font-semibold text-gray-700">
                  {review.createdBy.name}
                </h4>
                <div className="flex items-center justify-center -ml-[0.2rem]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={cls(
                        'w-5 h-5',
                        star <= review.score
                          ? 'text-yellow-400'
                          : 'text-gray-400'
                      )}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Profile;
