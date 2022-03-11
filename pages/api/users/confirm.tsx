import client from '@libs/server/client';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const foundToken = await client.token.findUnique({
    where: { payload: token },
    // include: { user: true },
    // include 로 해당 model에 관련된 model의 data를 가져올수있다
  });
  if (!foundToken) return res.status(404).end();

  req.session.user = {
    id: foundToken.userId,
  };
  // userId로 세션을 만든다

  await req.session.save();
  // 해당 세션을 저장한다

  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });

  res.json({ ok: true });
}

export default withApiSession(withHandler('POST', handler));

/**
 * 동작 순서
 * 1. 클라이언트에서 받아온 token으로 db에 해당 token이 있는지 조회한다.
 * 2. 토큰이 없다면 404에러와 함께 함수실행을 종료한다.
 * 3. 토큰이 있다면 token에서 받아온 userId로 세션을 생성 후 저장해준다.
 * 4. 토큰으로 세션 생성이 끝나면 모든 토큰을 삭제해준다.
 * 5. 클라이언트에 ok:true 를 보내준다.
 */
