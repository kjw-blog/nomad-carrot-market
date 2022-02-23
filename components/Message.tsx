import { cls } from '../libs/utils';

interface MessageProps {
  message: string;
  reverse?: boolean;
}

export default function Message({ message, reverse }: MessageProps) {
  return (
    <div
      className={cls(
        'flex items-start space-x-2',
        reverse ? 'flex-row-reverse space-x-reverse' : ''
      )}
    >
      <div className="w-8 h-8 bg-slate-300 rounded-full" />
      <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
        <p>{message}</p>
      </div>
    </div>
  );
}
