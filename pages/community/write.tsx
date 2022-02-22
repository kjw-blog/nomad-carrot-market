import type { NextPage } from 'next';
import Button from '../../components/Button';
import Layout from '../../components/Layout';

const Write: NextPage = () => {
  return (
    <Layout canGoBack>
      <form className="px-4 py-10">
        <textarea
          rows={4}
          placeholder="Ask a question!"
          className="mt-1 shadow-sm w-full transition focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
        />
        <Button text="Submit" />
      </form>
    </Layout>
  );
};

export default Write;
