import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.ua?.isBot) {
    // bot 접근 시 403 에러 발생
    return new Response("Please don't be a bot. Be Human.", { status: 403 });
  }

  if (!req.url.includes('/api')) {
    if (!req.url.includes('/enter') && !req.cookies.carrotsession) {
      // 로그인 쿠키가 없을경우 엔터 페이지로 redirect
      // 로그인 api 호출 시 redirect를 막기위해 api가 들어가는 url은 감시하지 않는다.

      // useEffect로 enter 페이지로 이동하는것과 다르게
      // 깜빡거림 없이 바로 enter 페이지로 이동시킨다.

      return NextResponse.redirect('/enter');
    }
  }

  console.log(req.geo?.country);
  // 호스팅업체에서 제공하는것 ?
  // 로컬환경에선 undefined
}
