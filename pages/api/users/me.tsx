import { withIronSessionApiRoute } from 'iron-session/next';
import client from '@libs/server/client';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

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

export default withIronSessionApiRoute(withHandler('GET', handler), {
  cookieName: 'carrotsession',
  password: '1238105534509238234253456726735674',
});
