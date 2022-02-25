import { FieldErrors, useForm } from 'react-hook-form';

interface LoginForm {
  username: string;
  email: string;
  password: string;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: 'onChange',
  });
  /**
   *  register  : input 과 state를 연결해주는 다리역할
   *  watch     : form 안에 있는 value를 볼 수 있게함
   */

  const onValid = (data: LoginForm) => {
    console.log("i'm vaild bby");
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register('username', {
          required: 'Username is required',
          minLength: {
            message: '5글자 이상을 입력해주세요.',
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      {errors.username?.message}
      <input
        {...register('email', {
          required: 'Email is required',
          validate: {
            notGmail: (value) =>
              !value.includes('@gmail.com') || 'gmail은 사용 불가능 합니다.',
          },
        })}
        type="email"
        placeholder="Email"
        className={`${
          Boolean(errors.email?.message)
            ? 'border-red-500 ring-2 ring-red-500 '
            : ''
        }`}
      />
      {errors.email?.message}
      <input
        {...register('password', { required: 'Password is required' })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value={'Create Account'} />
      {errors.password?.message}
    </form>
  );
}
