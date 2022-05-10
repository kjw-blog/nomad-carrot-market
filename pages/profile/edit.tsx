import type { NextPage } from 'next';
import Button from '@components/Button';
import Input from '@components/Input';
import Layout from '@components/Layout';
import useUser from '@libs/client/useUser';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import useMutation from '@libs/client/useMutation';
import { useState } from 'react';

interface EditProfileForm {
  avatar?: FileList;
  email?: string;
  phone?: string;
  name?: string;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<EditProfileForm>();
  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);

  const [avatarPreview, setAvatarPreview] = useState('');
  const avatar = watch('avatar');

  const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return;
    if (!email && !phone && !name) {
      return setError('formErrors', {
        message: '이메일 혹은 전화번호 중 하나를 입력해주세요.',
      });
    }
    if (avatar && avatar.length > 0 && user) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();

      const form = new FormData();
      form.append('file', avatar[0], user.id.toString());

      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();

      editProfile({ email, phone, name, avatarId: id });
    } else {
      editProfile({ email, phone, name });
    }

    // 만약 프로필 사진이 있다면 클라우드 플레어의 url을 담아서 api를 호출하고,
    // 그렇지 않다면 그 외의 데이터들만 담아서 api를 호출한다.
  };

  useEffect(() => {
    if (user?.email) setValue('email', user.email);
    if (user?.phone) setValue('phone', user.phone);
    if (user?.name) setValue('name', user.name);
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/jbwEg65i9cpROIJIsZXQBA/${user.avatar}/public`
      );
  }, [user, setValue]);

  useEffect(() => {
    if (data && !data.ok && data.error) {
      return setError('formErrors', { message: data.error });
    }
  }, [data, setError]);

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  return (
    <Layout canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-10 space-y-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="w-14 h-14 bg-slate-400 rounded-full"
            />
          ) : (
            <div className="w-14 h-14 bg-slate-400 rounded-full" />
          )}
          <label
            htmlFor="picture"
            className="focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 px-3 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md shadow-sm cursor-pointer"
          >
            Change
            <input
              {...register('avatar')}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register('name')}
          type="text"
          inputId="name"
          label="Name"
          required={false}
        />
        <Input
          register={register('email')}
          type="email"
          inputId="email"
          label="Email address"
          required={false}
        />
        <Input
          register={register('phone')}
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
        <Button loading={loading} text="Update profile" />
      </form>
    </Layout>
  );
};

export default EditProfile;
