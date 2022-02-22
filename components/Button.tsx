import { cls } from '../libs/utils';

interface ButtonProps {
  text: string;
  [key: string]: any;
}

export default function Button({ text, onClick, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className="bg-orange-500 w-full hover:bg-orange-600 transition text-white py-2 px-4 border border-transparent rounded-md mt-5 shadow-sm font-semibold text-sm focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none"
    >
      {text}
    </button>
  );
}
