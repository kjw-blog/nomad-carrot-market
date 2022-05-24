import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import withHandler from '@libs/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { seller },
    session: { user },
  } = req;

  const exist = await client.chats.findFirst({
    where: {
      buyerId: user?.id,
      AND: {
        sellerId: seller,
      },
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
        seller: {
          connect: {
            id: seller,
          },
        },
      },
    });

    return res.status(200).json({ ok: true, chat });
  }
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);
