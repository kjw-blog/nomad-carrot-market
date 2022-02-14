import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 py-20 px-10 grid gap-5">
      <div className="bg-white p-6 rounded-3xl shadow-2xl">
        <span className="font-semibold text-3xl">Select Item</span>
        <div className="flex justify-between my-2">
          <span className="text-gray-500">Grey Chair</span>
          <span className="font-semibold">19$</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Grey Chair</span>
          <span className="font-semibold">19$</span>
        </div>
        <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
          <span>Total</span>
          <span className="font-semibold">10$</span>
        </div>
        <div className="bg-blue-500 text-white py-5 text-center mt-4 w-1/2 mx-auto rounded-xl">
          Checkout
        </div>
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-2xl"></div>
      <div className="bg-white p-10 rounded-2xl shadow-2xl"></div>
      <div className="bg-white p-10 rounded-2xl shadow-2xl"></div>
    </div>
  );
};

export default Home;
