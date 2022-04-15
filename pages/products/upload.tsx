import type { NextPage } from "next";
import Button from "@components/Button";
import Input from "@components/Input";
import Layout from "@components/Layout";
import Textarea from "@components/Textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
}

interface UploadProductMutation {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<UploadProductForm>();
  const [uploadProduct, { loading, data }] =
    useMutation<UploadProductMutation>("/api/products");

  const onValid = (formData: UploadProductForm) => {
    if (loading) return;
    uploadProduct(formData);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push(`/products/${data.product.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="Upload Product">
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-16 space-y-5">
        <div>
          <label className="hover:text-orange-500 hover:border-orange-500 flex items-center justify-center w-full h-48 text-gray-700 transition-colors border-2 border-gray-300 border-dashed rounded-md cursor-pointer">
            <svg
              className="w-12 h-12"
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
        <Input
          register={register("name", {
            required: true,
          })}
          inputId="name"
          kind="text"
          label="Name"
          type="text"
          required
        />
        <Input
          register={register("price", {
            required: true,
          })}
          inputId="price"
          kind="price"
          label="Price"
          type="text"
          required
        />
        <div>
          <Textarea
            register={register("description", {
              required: true,
            })}
            name="description"
            label="Description"
            required
          />
        </div>
        <Button loading={loading} text="Upload product" />
      </form>
    </Layout>
  );
};

export default Upload;
