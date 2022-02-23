interface TextareaProps {
  label?: string;
  [key: string]: any;
}

export default function Textarea({ label, ...rest }: TextareaProps) {
  return (
    <>
      {label && (
        <label className="mb-1 block text-sm text-gray-700 font-semibold">
          {label}
        </label>
      )}
      <textarea
        {...rest}
        className="mt-1 shadow-sm w-full transition focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
        rows={4}
      />
    </>
  );
}
