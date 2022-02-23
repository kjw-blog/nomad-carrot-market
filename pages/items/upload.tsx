import type { NextPage } from 'next';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Layout from '../../components/Layout';
import Textarea from '../../components/Textarea';

const Upload: NextPage = () => {
  return (
    <Layout canGoBack>
      <form className="px-4 space-y-5 py-16">
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
        <Input inputId="name" kind="text" label="Name" type="text" required />
        <Input
          inputId="price"
          kind="price"
          label="Price"
          type="text"
          required
        />
        <div>
          <Textarea name="upload" label="Description" />
        </div>
        <Button text="Upload product" />
      </form>
    </Layout>
  );
};

export default Upload;
