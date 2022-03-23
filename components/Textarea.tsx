import { UseFormRegisterReturn } from 'react-hook-form';

interface TextareaProps {
  label?: string;
  name?: string;
  register: UseFormRegisterReturn;
  [key: string]: any;
}

export default function Textarea({
  label,
  name,
  register,
  ...rest
}: TextareaProps) {
  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
      )}
      <textarea
        {...register}
        {...rest}
        id={name}
        className="focus:ring-orange-500 focus:border-orange-500 w-full mt-1 transition border-gray-300 rounded-md shadow-sm resize-none"
        rows={4}
      />
    </>
  );
}
