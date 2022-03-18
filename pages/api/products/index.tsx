import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { name, price, description },
    session: { user },
  } = req;

  const product = await client.product.create({
    data: {
      name,
      price: +price,
      description,
      image: 'xx',
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  res.status(200).json({ ok: true, product });
}

export default withApiSession(
  withHandler({
    method: 'POST',
    handler,
  })
);

/**
 * 동작순서
 * 1. request에서 body와 session 에서 값을 받아온다.
 * 2. 받아온 값으로 product 데이터를 생성해준다.
 * 3. 클라이언트에 ok:true 와 생성한 product를 보내준다.
 */
