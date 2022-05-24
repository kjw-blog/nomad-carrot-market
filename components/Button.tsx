import { cls } from '@libs/client/utils';

interface ButtonProps {
  text: string;
  small?: boolean;
  loading?: boolean;
  onClick?: () => void;
  [key: string]: any;
}

export default function Button({
  text,
  small,
  onClick,
  loading = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={cls(
        'bg-orange-500 justify-center w-full hover:bg-orange-600 transition text-white py-2 border border-transparent rounded-md shadow-sm font-semibold text-sm focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none',
        small ? '' : 'mt-5 px-4'
      )}
    >
      {loading ? 'Loading...' : text}
    </button>
  );
}
