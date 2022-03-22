import Link from 'next/link';

interface ItemProps {
  item: string;
  price: number;
  hearts: number;
  id: number;
}

export default function Item({ item, price, hearts, id }: ItemProps) {
  return (
    <Link href={`/products/${id}`}>
      <a className="flex justify-between px-4 pb-4 border-b cursor-pointer">
        <div className="flex space-x-4">
          <div className="w-20 h-20 bg-gray-300 rounded-md" />
          <div className="flex flex-col pt-2">
            <h3 className="text-sm font-semibold text-gray-900">{item}</h3>
            <span className="mt-6 font-semibold text-gray-900">{`${price.toLocaleString()}원`}</span>
          </div>
        </div>
        <div className="flex items-end justify-end space-x-2">
          <div className="flex items-center text-sm text-gray-600 space-x-0.5">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <span>{hearts}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
