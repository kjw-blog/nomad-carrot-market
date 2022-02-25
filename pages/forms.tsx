// == 원하는 수정 목록 ==
// 코드 간소화 (O)
// 더 나은 validation  (o)
// 더 나은 에러 처리 (set, clear, display)
// input 태그에 대한 컨트롤
// event에 대한 신경줄이기 ?
// input 태그 간소화 (O)

import { useForm } from 'react-hook-form';

export default function Form() {
  const { register, handleSubmit } = useForm();
  /**
   *  register  : input 과 state를 연결해주는 다리역할
   *  watch     : form 안에 있는 value를 볼 수 있게함
   */

  const onValid = () => {
    console.log("i'm vaild bby");
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register('username', { required: true })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register('email', { required: true })}
        type="email"
        placeholder="Email"
      />
      <input
        {...register('password', { required: true })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value={'Create Account'} />
    </form>
  );
}
