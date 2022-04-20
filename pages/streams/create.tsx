import type { NextPage } from 'next';
import Button from '@components/Button';
import Input from '@components/Input';
import Layout from '@components/Layout';
import Textarea from '@components/Textarea';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stream } from '@prisma/client';

interface CreateForm {
  name: string;
  price: string;
  description: string;
}
interface CreateResponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const router = useRouter();
  const [createStream, { loading, data }] =
    useMutation<CreateResponse>('/api/streams');
  const { register, handleSubmit } = useForm<CreateForm>();

  const onValid = (form: CreateForm) => {
    if (loading) return;
    createStream(form);
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-10 space-y-5">
        <Input
          register={register('name', { required: true })}
          inputId="name"
          label="Name"
          type="text"
          required
        />
        <Input
          register={register('price', { required: true })}
          inputId="price"
          kind="price"
          label="Price"
          type="text"
          required
        />
        <div>
          <Textarea
            register={register('description', { required: true })}
            name="create"
            label="Description"
          />
        </div>
        <Button loading={loading} text="Go live" />
      </form>
    </Layout>
  );
};

export default Create;
