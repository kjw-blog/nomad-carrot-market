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
      <label htmlFor={inputId} className="text-sm text-gray-700 font-semibold">
        {label}
      </label>
      <div className="mt-1 rounded-md relative items-center shadow-sm">
        {kind === 'text' && (
          <input
            {...register}
            type={type}
            id={inputId}
            required={required}
            className="appearance-none w-full pr-12 transition py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        )}
        {kind === 'phone' && (
          <div className="flex rounded-md shadow-sm mt-1">
            <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
              +82
            </span>
            <input
              {...register}
              type={type}
              id={inputId}
              required={required}
              className="appearance-none transition w-full px-3 py-2 border border-gray-300 rounded-md rounded-l-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        )}
        {kind === 'price' && (
          <div className="relative rounded-md flex items-center shadow-sm">
            <div className="absolute pointer-events-none left-0 pl-3 flex items-center justify-center">
              <span className=" text-gray-500 text-sm">\</span>
            </div>
            <input
              {...register}
              type={type}
              id={inputId}
              required={required}
              placeholder="0.00"
              className="appearance-none w-full pl-7 pr-12 transition py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
            <div className="absolute pointer-events-none right-0 pr-3 flex items-center justify-center">
              <span className="text-gray-500 text-sm">KRW</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
