import { cfUrl, cls } from '@libs/client/utils';
import Image from 'next/image';

interface MessageProps {
  message: string;
  reverse?: boolean;
  avatarUrl?: string;
}

export default function Message({ message, reverse, avatarUrl }: MessageProps) {
  return (
    <div
      className={cls(
        'flex items-start space-x-2',
        reverse ? 'flex-row-reverse space-x-reverse' : ''
      )}
    >
      {avatarUrl ? (
        <Image
          src={cfUrl({ id: avatarUrl, variant: 'avatar' })}
          width={32}
          height={32}
          alt="profile"
          className="bg-slate-300 w-8 h-8 rounded-full"
        />
      ) : (
        <div className="bg-slate-300 w-8 h-8 rounded-full" />
      )}
      <div className="w-1/2 p-2 text-sm text-gray-700 border border-gray-300 rounded-md">
        <p>{message}</p>
      </div>
    </div>
  );
}
