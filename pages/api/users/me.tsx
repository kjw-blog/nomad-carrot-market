import client from '@libs/server/client';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const profile = await client.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });

  res.json({
    ok: true,
    profile,
  });
}

export default withApiSession(
  withHandler({
    method: 'GET',
    handler,
  })
);

/**
 * 동작순서
 * 1. 세션에 저장돼있는 user의 id로 user테이블에서 데이터를 받아온다.
 * 2. 클라이언트에 ok:true 와 user테이블에서 받아온 데이터를 보내준다.
 */

// 세션 유무를 체크안하는 이유는 나중에 세션 유무에 따라 로그인페이지 , 당근마켓 사용페이지 를 나누어서 그런거같다
