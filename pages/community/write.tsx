import type { NextPage } from 'next';

const Write: NextPage = () => {
  return (
    <form className="px-4 py-10">
      <textarea
        rows={4}
        placeholder="Ask a question!"
        className="mt-1 shadow-sm w-full transition focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
      />
      <button className="bg-orange-500 w-full hover:bg-orange-600 transition text-white py-2 px-4 border border-transparent rounded-md mt-2 shadow-sm font-semibold text-sm focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
        Submit
      </button>
    </form>
  );
};

export default Write;
