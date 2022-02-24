// == 원하는 수정 목록 ==
// 코드 간소화 (O)
// 더 나은 validation
// 더 나은 에러 처리 (set, clear, display)
// input 태그에 대한 컨트롤
// event에 대한 신경줄이기 ?
// input 태그 간소화 (O)

import { useForm } from 'react-hook-form';

export default function Form() {
  const { register, watch } = useForm();
  /**
   *  register  : input 과 state를 연결해주는 다리역할
   *  watch     : form 안에 있는 value를 볼 수 있게함
   */

  return (
    <form>
      <input
        {...register('username')}
        type="text"
        placeholder="Username"
        required
      />
      <input {...register('email')} type="email" placeholder="Email" required />
      <input
        {...register('password')}
        type="password"
        placeholder="Password"
        required
      />
      <input type="submit" value={'Create Account'} />
    </form>
  );
}
