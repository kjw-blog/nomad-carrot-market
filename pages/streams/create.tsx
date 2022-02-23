import type { NextPage } from 'next';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Layout from '../../components/Layout';
import Textarea from '../../components/Textarea';

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
          <Textarea name="create" label="Description" />
        </div>
        <Button text="Go live" />
      </form>
    </Layout>
  );
};

export default Create;
