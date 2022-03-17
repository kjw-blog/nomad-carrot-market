import { useState } from 'react';

export default function Cards() {
  const [num, setNum] = useState(0);
  const [useDarkMode, setUseDarkMode] = useState(false);
  return (
    <>
      <div className="bg-slate-600 flex justify-center py-10 space-x-10">
        <div>
          <input
            type="radio"
            name="mode"
            id="right"
            checked={!useDarkMode ? true : false}
            onClick={() => setUseDarkMode(false)}
          />
          <label className="pl-3 font-bold text-white" htmlFor="right">
            RIGHT 모드
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="mode"
            id="dark"
            checked={useDarkMode ? true : false}
            onClick={() => setUseDarkMode(true)}
          />
          <label className="pl-3 font-bold text-white" htmlFor="dark">
            Dark 모드
          </label>
        </div>
      </div>
      <div
        className={`bg-slate-400 p-20 grid xl:place-content-center lg:grid-cols-2 xl:grid-cols-3 gap-10 min-h-screen ${
          useDarkMode && 'dark'
        }`}
      >
        <div className="dark:bg-black rounded-3xl flex flex-col justify-between p-6 transition bg-white shadow-2xl">
          <span className="dark:text-white text-3xl font-semibold">
            Select Item
          </span>
          <ul>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between my-2">
                <span className="dark:text-gray-100 text-gray-500 transition">
                  Grey Chair
                </span>
                <span className="dark:text-white font-semibold transition">
                  19$
                </span>
              </div>
            ))}
          </ul>
          <div className="flex justify-between pt-2 mt-2 border-t-2 border-dashed">
            <span className=" dark:text-white transition">Total</span>
            <span className="dark:text-white font-semibold transition">
              10$
            </span>
          </div>
          <button className="dark:bg-black dark:border dark:border-white rounded-xl hover:bg-teal-500 hover:text-black dark:hover:bg-white block w-1/2 py-5 mx-auto mt-4 text-center text-white transition bg-blue-500">
            Checkout
          </button>
        </div>
        <div className="rounded-2xl group overflow-hidden bg-white shadow-2xl">
          <div className=" portrait:bg-indigo-600 landscape:bg-teal-500 pb-14 xl:pb-40 p-6">
            <span className="text-2xl text-white">Profile</span>
          </div>
          <div className="rounded-3xl -top-5 relative p-6 bg-white">
            <div className="-top-16 relative flex items-end justify-between">
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500">Orders</span>
                <span className="font-semibold">340</span>
              </div>
              <div className="bg-zinc-300 group-hover:bg-red-300 w-24 h-24 transition-colors rounded-full" />
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500">Spent</span>
                <span className="font-semibold">$2,310</span>
              </div>
            </div>
            <div className=" relative flex flex-col items-center -mt-10 -mb-5">
              <span className="text-lg font-semibold">Tony Molloy</span>
              <span className="text-sm text-gray-500">New York, USA</span>
            </div>
          </div>
        </div>
        <div className="rounded-3xl lg:col-span-2 xl:col-span-1 p-6 bg-white shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <span>⬅️</span>
            <div className="space-x-3">
              <span>⭐ 4.9</span>
              <span className="p-2 rounded-md shadow-xl">❤️</span>
            </div>
          </div>
          <div className="bg-zinc-400 h-72 mb-5" />
          <div className="flex flex-col">
            <span className=" text-xl font-semibold">Swoon Lounge</span>
            <span className="text-xs text-gray-500">Chair</span>
            <div className="flex items-center justify-between mt-3 mb-5">
              <div className="space-x-2">
                <button className="hover:bg-opacity-100 focus:bg-opacity-100 focus:ring-2 ring-offset-2 ring-yellow-500 w-5 h-5 transition bg-yellow-500 bg-opacity-50 rounded-full" />
                <button className="hover:bg-opacity-100 focus:bg-opacity-100 focus:ring-2 ring-offset-2 ring-indigo-500 w-5 h-5 transition bg-indigo-500 bg-opacity-50 rounded-full" />
                <button className="hover:bg-opacity-100 focus:bg-opacity-100 focus:ring-2 ring-offset-2 ring-teal-500 w-5 h-5 transition bg-teal-500 bg-opacity-50 rounded-full" />
              </div>

              <div className="flex items-center space-x-5">
                <button
                  onClick={() => {
                    if (num > 0) {
                      setNum((prev) => prev - 1);
                    } else {
                      alert('- 실패');
                    }
                  }}
                  className=" aspect-square active:bg-blue-300 flex items-center justify-center w-8 text-xl text-gray-500 bg-blue-200 rounded-lg"
                >
                  -
                </button>
                <span>{num}</span>
                <button
                  onClick={() => {
                    if (num < 9) {
                      setNum((prev) => prev + 1);
                    } else {
                      alert('+ 실패');
                    }
                  }}
                  className=" aspect-square active:bg-blue-300 flex items-center justify-center w-8 text-xl text-gray-500 bg-blue-200 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold">$450</span>
              <button className="rounded-xl px-8 py-2 text-xs text-white bg-blue-500">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
