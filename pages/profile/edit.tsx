import type { NextPage } from "next";
import Button from "@components/Button";
import Input from "@components/Input";
import Layout from "@components/Layout";

const EditProfile: NextPage = () => {
  return (
    <Layout canGoBack>
      <form className="px-4 py-10 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 bg-slate-400 rounded-full" />
          <label
            htmlFor="picture"
            className="focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 px-3 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md shadow-sm cursor-pointer"
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
