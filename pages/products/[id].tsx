import type { NextPage } from 'next';
import Button from '@components/Button';
import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { Product, User } from '@prisma/client';
import Link from 'next/link';
import useMutation from '@libs/client/useMutation';
import { cfUrl, cls } from '@libs/client/utils';
import { useEffect } from 'react';
import Image from 'next/image';
// import useUser from '@libs/client/useUser';

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  isLiked: boolean;
  relatedProducts: Product[];
}

const ItemDetail: NextPage = () => {
  const router = useRouter();

  const {
    data,
    error,
    mutate: boundMutate,
  } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );

  const [setTrade, { data: tradeData, loading: tradeLoading }] =
    useMutation('/api/trade');
  const [toggleFav, { loading }] = useMutation(
    `/api/products/${router.query.id}/fav`
  );

  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    if (!loading) toggleFav({});
    // mutate('/api/users/me', (prev: any) => ({ ok: !prev.ok }), false);
    // useSWRConfig에서 가져온 mutate함수로 (key(바꿀 swr의 url) /  변경할 data / 다시 swr을 호출할지 여부)를 파라미터로 줘서 사용할 수 있다.
    // mutate함수에 파라미터로 key 만 넘겨주게 되면 단순 refresh만 하게된다.
  };
  const talkToSeller = () => {
    if (tradeLoading || !data) {
      return;
    }
    if (confirm('판매자와 대화를 시작하시겠습니까?')) {
      setTrade({
        seller: data.product.user.id,
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    if (data && !data.product) {
      alert('없는 상품입니다.');
      router.replace('/');
    }
  }, [data, router]);

  useEffect(() => {
    if (tradeData && tradeData.ok) {
      router.push(`/chats/${tradeData.chat.id}`);
    }
  }, [tradeData, router]);

  return (
    <Layout canGoBack>
      <div className="px-4 py-10">
        <div className="mb-8">
          {data?.product?.image && data?.product?.image !== 'xx' ? (
            <div className="pb-80 relative">
              <Image
                src={cfUrl({ id: data?.product?.image })}
                className="bg-slate-300 object-scale-down"
                layout="fill"
                alt={data?.product?.name}
              />
            </div>
          ) : (
            <>
              <div className="h-96 bg-slate-300" />
            </>
          )}

          <div className="flex items-center py-3 space-x-3 border-t border-b cursor-pointer">
            {data?.product?.user?.avatar ? (
              <Image
                src={cfUrl({
                  id: data?.product?.user?.avatar,
                  variant: 'avatar',
                })}
                className="w-12 h-12 rounded-full"
                width={48}
                height={48}
                alt={data?.product?.user?.name}
              />
            ) : (
              <div className="bg-slate-300 w-12 h-12 rounded-full" />
            )}

            <div>
              <p className="text-sm font-semibold text-gray-700">
                {data?.product?.user?.name}
              </p>
              <Link href={`/users/profiles/${data?.product?.user?.id}`}>
                <a className="text-xs font-semibold text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            {!data && !error ? (
              <h1 className="my-10 font-bold text-center text-gray-700">
                Loading...
              </h1>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-900">
                  {data?.product?.name}
                </h1>
                <span className="block mt-3 text-3xl text-gray-900">
                  {data?.product?.price?.toLocaleString()}원
                </span>
                <p className="my-6 text-base text-gray-700">
                  {data?.product?.description}
                </p>
              </>
            )}

            <div className="flex items-center justify-between space-x-2">
              <Button onClick={talkToSeller} text="Talk to seller" small />
              <button
                onClick={onFavClick}
                className={cls(
                  'hover:bg-gray-100 flex items-center justify-center p-2  transition duration-300 rounded-md',
                  data?.isLiked
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-gray-400 hover:text-gray-500'
                )}
              >
                {data?.isLiked ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Similar items
          </h2>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {data?.relatedProducts?.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <a>
                  <div className="bg-slate-300 w-full h-56 mb-4" />
                  <h3 className="-mb-1 text-gray-700">{product.name}</h3>
                  <span className="text-sm font-semibold text-gray-900">
                    {product.price}원
                  </span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
