import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import withHandler from '@libs/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      body: { product },
      session: { user },
    } = req;

    const exist = await client.chats.findFirst({
      where: {
        AND: [{ productId: product }, { buyerId: user?.id }],
      },
    });

    if (exist) {
      return res.status(200).json({ ok: true, chat: exist });
    } else {
      const chat = await client.chats.create({
        data: {
          buyer: {
            connect: {
              id: user?.id,
            },
          },
          product: {
            connect: {
              id: product,
            },
          },
        },
      });

      return res.status(200).json({ ok: true, chat });
    }
  } else if (req.method === 'GET') {
    res.status(200).json({ ok: true });
  }
}

export default withApiSession(
  withHandler({
    methods: ['POST', 'GET'],
    handler,
  })
);
