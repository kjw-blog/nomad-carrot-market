import { useState } from 'react';

export default function Cards() {
  const [num, setNum] = useState(0);
  const [useDarkMode, setUseDarkMode] = useState(false);
  return (
    <>
      <div className="bg-slate-600 flex justify-center space-x-10 py-10">
        <div>
          <input
            type="radio"
            name="mode"
            id="right"
            checked={!useDarkMode ? true : false}
            onClick={() => setUseDarkMode(false)}
          />
          <label className="text-white pl-3 font-bold" htmlFor="right">
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
          <label className="text-white pl-3 font-bold" htmlFor="dark">
            Dark 모드
          </label>
        </div>
      </div>
      <div
        className={`bg-slate-400  p-20 grid xl:place-content-center lg:grid-cols-2 xl:grid-cols-3 gap-10 min-h-screen ${
          useDarkMode && 'dark'
        }`}
      >
        <div className="bg-white dark:bg-black flex flex-col justify-between p-6 transition rounded-3xl shadow-2xl">
          <span className="font-semibold dark:text-white text-3xl">
            Select Item
          </span>
          <ul>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between my-2">
                <span className="text-gray-500 dark:text-gray-100 transition">
                  Grey Chair
                </span>
                <span className="font-semibold dark:text-white transition">
                  19$
                </span>
              </div>
            ))}
          </ul>
          <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
            <span className=" dark:text-white transition">Total</span>
            <span className="font-semibold dark:text-white transition">
              10$
            </span>
          </div>
          <button
            className="bg-blue-500 dark:bg-black dark:border dark:border-white text-white py-5 text-center mt-4 w-1/2 mx-auto rounded-xl block
          hover:bg-teal-500 hover:text-black
          dark:hover:bg-white transition
          "
          >
            Checkout
          </button>
        </div>
        <div className="bg-white overflow-hidden rounded-2xl shadow-2xl group">
          <div className=" portrait:bg-indigo-600 landscape:bg-teal-500 p-6 pb-14 xl:pb-40">
            <span className="text-white text-2xl">Profile</span>
          </div>
          <div className="rounded-3xl p-6 relative -top-5 bg-white">
            <div className="flex relative -top-16 items-end justify-between">
              <div className="flex flex-col items-center">
                <span className="text-gray-500 text-sm">Orders</span>
                <span className="font-semibold">340</span>
              </div>
              <div className="w-24 h-24 bg-zinc-300 rounded-full group-hover:bg-red-300 transition-colors" />
              <div className="flex flex-col items-center">
                <span className="text-gray-500 text-sm">Spent</span>
                <span className="font-semibold">$2,310</span>
              </div>
            </div>
            <div className="relative flex flex-col items-center -mt-10 -mb-5 ">
              <span className="font-semibold text-lg">Tony Molloy</span>
              <span className="text-sm text-gray-500">New York, USA</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl lg:col-span-2 xl:col-span-1 shadow-xl">
          <div className="flex justify-between items-center mb-5">
            <span>⬅️</span>
            <div className="space-x-3">
              <span>⭐ 4.9</span>
              <span className="shadow-xl p-2 rounded-md">❤️</span>
            </div>
          </div>
          <div className="bg-zinc-400 h-72 mb-5" />
          <div className="flex flex-col">
            <span className="font-semibold text-xl ">Swoon Lounge</span>
            <span className="text-xs text-gray-500">Chair</span>
            <div className="mt-3 mb-5 flex justify-between items-center">
              <div className="space-x-2">
                <button className="w-5 h-5 rounded-full bg-yellow-500 bg-opacity-50 hover:bg-opacity-100 focus:bg-opacity-100 focus:ring-2 ring-offset-2 ring-yellow-500 transition" />
                <button className="w-5 h-5 rounded-full bg-indigo-500 bg-opacity-50 hover:bg-opacity-100 focus:bg-opacity-100 focus:ring-2 ring-offset-2 ring-indigo-500 transition" />
                <button className="w-5 h-5 rounded-full bg-teal-500 bg-opacity-50 hover:bg-opacity-100 focus:bg-opacity-100 focus:ring-2 ring-offset-2 ring-teal-500 transition" />
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
                  className=" bg-blue-200 flex justify-center items-center aspect-square w-8 text-xl text-gray-500 rounded-lg active:bg-blue-300"
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
                  className=" bg-blue-200 flex justify-center items-center aspect-square w-8 text-xl text-gray-500 rounded-lg active:bg-blue-300"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-2xl">$450</span>
              <button className="bg-blue-500 text-white px-8 py-2 rounded-xl text-xs">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}