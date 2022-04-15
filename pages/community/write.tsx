import type { NextPage } from "next";
import { useForm } from "react-hook-form";

import Button from "@components/Button";
import Layout from "@components/Layout";
import Textarea from "@components/Textarea";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import useCoords from "@libs/client/useCoords";

interface WriteForm {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { latitude, longitude } = useCoords();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, data }] = useMutation<WriteResponse>("/api/posts");

  const onValid = (formData: WriteForm) => {
    if (loading) return;

    post({ ...formData, latitude, longitude });
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="글쓰기">
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-10">
        <Textarea
          register={register("question", {
            required: true,
            minLength: {
              value: 5,
              message: "5글자 이상 입력해주세요.",
            },
          })}
          required
          placeholder="Ask a question!"
        />
        <Button loading={loading} text="Submit" />
      </form>
    </Layout>
  );
};

export default Write;
