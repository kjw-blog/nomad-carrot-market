import type { NextPage } from 'next';
import Layout from '../../components/Layout';

const Upload: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="px-4 space-y-5 py-16">
        <div>
          <label className="w-full flex cursor-pointer text-gray-700 hover:text-orange-500 hover:border-orange-500 transition-colors items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className="hidden" type="file" />
          </label>
        </div>
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm text-gray-700 font-semibold"
          >
            Name
          </label>
          <div className="relative rounded-md flex items-center shadow-sm">
            <input
              type="text"
              id="name"
              className="appearance-none w-full pr-12 transition py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="price"
            className="mb-1 block text-sm text-gray-700 font-semibold"
          >
            Price
          </label>
          <div className="relative rounded-md flex items-center shadow-sm">
            <div className="absolute pointer-events-none left-0 pl-3 flex items-center justify-center">
              <span className=" text-gray-500 text-sm">$</span>
            </div>
            <input
              type="text"
              id="price"
              placeholder="0.00"
              className="appearance-none w-full pl-7 pr-12 transition py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
            <div className="absolute pointer-events-none right-0 pr-3 flex items-center justify-center">
              <span className="text-gray-500 text-sm">USD</span>
            </div>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-700 font-semibold">
            Description
          </label>
          <textarea
            className="mt-1 shadow-sm w-full transition focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
            rows={4}
          />
        </div>
        <button className="bg-orange-500 w-full hover:bg-orange-600 transition text-white py-2 px-4 border border-transparent rounded-md mt-5 shadow-sm font-semibold text-sm focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
          Upload product
        </button>
      </div>
    </Layout>
  );
};

export default Upload;
