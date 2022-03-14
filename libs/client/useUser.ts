import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch(`/api/users/me`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.ok) {
          return router.replace('/enter');
        }
        setUser(data.profile);
      });
  }, [router]);

  return user;
}

/**
 * replace 와 push 의 차이
 *
 * replace : 화면 자체를 변경해준다? 뒤로가기 같은것을 방지할 수 있음. 브라우저 히스토리에 남기지 않음.
 *  ex) 메인페이지 호출 => 세션없을 시 로그인 화면으로 replace => 뒤로가기 불가능
 *
 * push : 화면을 이동시켜준다. 브라우저 히스토리에 남김
 * ex) 메인페이지 호출 => 세션없을 시 로그인 화면으로 push => 뒤로가기 => 메인페이지 호출 => 세션없으므로 로그인 화면으로 push = 무의미하다
 */
