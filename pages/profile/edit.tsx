import type { NextPage } from "next";
import Button from "@components/Button";
import Input from "@components/Input";
import Layout from "@components/Layout";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface EditProfileForm {
  email?: string;
  phone?: string;
  formErrors?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditProfileForm>();

  const onValid = ({ email, phone }: EditProfileForm) => {
    if (!email && !phone) {
      setError("formErrors", {
        message: "이메일 혹은 전화번호 중 하나를 입력해주세요.",
      });
    }
    const form: EditProfileForm = {};

    if (email) form.email = email;
    if (phone) form.phone = phone;

    console.log(form);
  };

  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  }, [user, setValue]);
  return (
    <Layout canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-10 space-y-4">
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
          register={register("email")}
          type="email"
          inputId="email"
          label="Email address"
          kind="text"
          required={false}
        />
        <Input
          register={register("phone")}
          type="text"
          inputId="phone"
          label="Phone number"
          kind="phone"
          required={false}
        />
        {errors.formErrors && (
          <span className="block my-2 text-sm text-center text-red-500">
            {errors.formErrors.message}
          </span>
        )}
        <Button text="Update profile" />
      </form>
    </Layout>
  );
};

export default EditProfile;
