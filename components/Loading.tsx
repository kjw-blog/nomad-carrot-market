import { cls } from '@libs/client/utils';

export default function Loading() {
  const delay = [
    ' bg-[#FFF136]',
    'animation-delay-200 bg-[#FFDF24]',
    'animation-delay-400 bg-[#FFCD12]',
    'animation-delay-600 bg-[#FFBB00]',
  ];

  return (
    <div className="bg-slate-600 absolute top-0 left-0 z-[1] w-full flex justify-center items-center h-screen bg-opacity-25 backdrop-blur-sm">
      <div className="w-[100px] h-[100px] justify-center items-center grid grid-cols-4 grid-rows-4 rotate-45">
        {new Array(16).fill(0).map((_, idx) => (
          <span
            key={idx}
            className={cls(
              ' animate-loading w-[20px] h-[20px] rounded-[50%]',
              delay[idx % 4]
            )}
          ></span>
        ))}
      </div>
    </div>
  );
}
