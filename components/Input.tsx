import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  kind: 'text' | 'phone' | 'price';
  label: string;
  inputId: string;
  register: UseFormRegisterReturn;
  type: string;
  required: boolean;
}

export default function Input({
  kind = 'text',
  label,
  inputId,
  register,
  type,
  required,
}: InputProps) {
  return (
    <div>
      <label htmlFor={inputId} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative items-center mt-1 rounded-md shadow-sm">
        {kind === 'text' && (
          <input
            {...register}
            type={type}
            id={inputId}
            required={required}
            className="focus:outline-none focus:ring-orange-500 focus:border-orange-500 w-full py-2 pr-12 placeholder-gray-400 transition border border-gray-300 rounded-md shadow-sm appearance-none"
          />
        )}
        {kind === 'phone' && (
          <div className="flex mt-1 rounded-md shadow-sm">
            <span className="rounded-l-md bg-gray-50 flex items-center justify-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 select-none">
              +82
            </span>
            <input
              {...register}
              type={type}
              id={inputId}
              required={required}
              className="focus:outline-none focus:ring-orange-500 focus:border-orange-500 w-full px-3 py-2 placeholder-gray-400 transition border border-gray-300 rounded-md rounded-l-none shadow-sm appearance-none"
            />
          </div>
        )}
        {kind === 'price' && (
          <div className="relative flex items-center rounded-md shadow-sm">
            <div className="absolute left-0 flex items-center justify-center pl-3 pointer-events-none">
              <span className=" text-sm text-gray-500">\</span>
            </div>
            <input
              {...register}
              type={type}
              id={inputId}
              required={required}
              placeholder="0.00"
              className="pl-7 focus:outline-none focus:ring-orange-500 focus:border-orange-500 w-full py-2 pr-12 placeholder-gray-400 transition border border-gray-300 rounded-md shadow-sm appearance-none"
            />
            <div className="absolute right-0 flex items-center justify-center pr-3 pointer-events-none">
              <span className="text-sm text-gray-500">KRW</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
