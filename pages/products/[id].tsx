import type { NextPage } from 'next';
import Button from '@components/Button';
import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Product, User } from '@prisma/client';
import Link from 'next/link';

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
}

const ItemDetail: NextPage = () => {
  const router = useRouter();

  const { data, error } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );

  return (
    <Layout canGoBack>
      <div className="px-4 py-10">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="flex items-center py-3 space-x-3 border-t border-b cursor-pointer">
            <div className="bg-slate-300 w-12 h-12 rounded-full" />
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
                  {data?.product?.price.toLocaleString()}원
                </span>
                <p className="my-6 text-base text-gray-700">
                  {data?.product?.description}
                </p>
              </>
            )}

            <div className="flex items-center justify-between space-x-2">
              <Button text="Talk to seller" small />
              <button className="hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 flex items-center justify-center p-2 text-gray-400 transition bg-gray-100 rounded-md">
                <svg
                  className=" w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Similar items
          </h2>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {data?.relatedProducts.map((product) => (
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
