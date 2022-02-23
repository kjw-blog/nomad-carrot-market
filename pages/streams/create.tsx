import type { NextPage } from 'next';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Layout from '../../components/Layout';

const Create: NextPage = () => {
  return (
    <Layout canGoBack>
      <form className="py-10 px-4 space-y-5">
        <Input inputId="name" kind="text" label="Name" type="text" required />
        <Input
          inputId="price"
          kind="price"
          label="Price"
          type="text"
          required
        />
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
      </form>
    </Layout>
  );
};

export default Create;
