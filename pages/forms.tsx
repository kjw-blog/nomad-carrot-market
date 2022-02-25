// == 원하는 수정 목록 ==
// 코드 간소화 (O)
// 더 나은 validation  (o)
// 더 나은 에러 처리 (set, clear, display)
// input 태그에 대한 컨트롤
// event에 대한 신경줄이기 ?
// input 태그 간소화 (O)

import { FieldErrors, useForm } from 'react-hook-form';

interface LoginForm {
  username: string;
  email: string;
  password: string;
}

export default function Form() {
  const { register, handleSubmit } = useForm<LoginForm>();
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
      <input
        {...register('email', { required: 'Email is required' })}
        type="email"
        placeholder="Email"
      />
      <input
        {...register('password', { required: 'Password is required' })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value={'Create Account'} />
    </form>
  );
}
