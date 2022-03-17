import Link from 'next/link';

interface ItemProps {
  item: string;
  item_detail?: string;
  price: number;
  comments: number;
  hearts: number;
  id: number;
}

export default function Item({
  item,
  item_detail,
  price,
  comments,
  hearts,
  id,
}: ItemProps) {
  return (
    <Link href={`/products/${id}`}>
      <a className="flex justify-between px-4 pb-4 border-b cursor-pointer">
        <div className="flex space-x-4">
          <div className="w-20 h-20 bg-gray-300 rounded-md" />
          <div className="flex flex-col pt-2">
            <h3 className="text-sm font-semibold text-gray-900">{item}</h3>
            {item_detail && (
              <span className="text-xs text-gray-500">{item_detail}</span>
            )}
            <span className="mt-1 font-semibold text-gray-900">{`$${price}`}</span>
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            <span>{comments}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
