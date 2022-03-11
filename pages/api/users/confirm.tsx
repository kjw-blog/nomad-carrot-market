import { withIronSessionApiRoute } from 'iron-session/next';
import client from '@libs/server/client';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const exists = await client.token.findUnique({
    where: { payload: token },
    // include: { user: true },
    // include 로 해당 model에 관련된 model의 data를 가져올수있다
  });
  if (!exists) res.status(404).end();
  req.session.user = {
    id: exists?.userId,
  };
  // userId로 세션을 만든다

  await req.session.save();
  // 해당 세션을 저장한다

  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler('POST', handler), {
  cookieName: 'carrotsession',
  password: '1238105534509238234253456726735674',
});

/**
 *  cookieName : 생성할 쿠키의 이름
 *  password : 쿠키를 암호화할때 사용할 비밀번호
 */
