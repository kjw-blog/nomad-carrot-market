import type { NextPage } from 'next';
import Button from '../../components/Button';
import Layout from '../../components/Layout';

const Create: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="py-10 px-4 space-y-5">
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
        <Button text="Go live" />
      </div>
    </Layout>
  );
};

export default Create;
