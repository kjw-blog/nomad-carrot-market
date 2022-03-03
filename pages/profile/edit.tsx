import type { NextPage } from 'next';
import Button from '@components/Button';
import Input from '@components/Input';
import Layout from '@components/Layout';

const EditProfile: NextPage = () => {
  return (
    <Layout canGoBack>
      <form className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 bg-slate-400 rounded-full" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-semibold focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          type="email"
          inputId="email"
          label="Email address"
          kind="text"
          required
        />
        <Input
          type="number"
          inputId="phone"
          label="Phone number"
          kind="phone"
          required
        />
        <Button text="Update profile" />
      </form>
    </Layout>
  );
};

export default EditProfile;
