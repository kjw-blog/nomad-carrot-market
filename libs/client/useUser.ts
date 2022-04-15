import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

const publicPages = ["/enter"];

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>("/api/users/me");
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
      if (!publicPages.includes(router.pathname)) router.replace("/enter");
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error, error };
}

/**
 *
 * swr 사용 방법
 * useSWR(1 , 2)
 * 1에는 호출할 api url(key)를 2에는 해당 url으로 fetch할 함수를 넣는다
 *
 * swr의 super_cache 에
 * super_cache = {
 *      url : {
 *          받아온 data
 *      }
 * }
 * 형식으로 저장된다.
 *
 * ===================================
 *
 * replace 와 push 의 차이
 *
 * replace : 화면 자체를 변경해준다? 뒤로가기 같은것을 방지할 수 있음. 브라우저 히스토리에 남기지 않음.
 *  ex) 메인페이지 호출 => 세션없을 시 로그인 화면으로 replace => 뒤로가기 불가능
 *
 * push : 화면을 이동시켜준다. 브라우저 히스토리에 남김
 * ex) 메인페이지 호출 => 세션없을 시 로그인 화면으로 push => 뒤로가기 => 메인페이지 호출 => 세션없으므로 로그인 화면으로 push = 무의미하다
 */
