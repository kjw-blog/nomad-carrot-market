import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import withHandler from '@libs/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  const cleanId = +id.toString();

  const chat = await client.chats.findUnique({
    where: {
      id: cleanId,
    },
    include: {
      message: {
        select: {
          message: true,
        },
      },
      buyer: {
        select: {
          avatar: true,
          name: true,
          id: true,
        },
      },
      seller: {
        select: {
          avatar: true,
          name: true,
          id: true,
        },
      },
    },
  });

  res.status(200).json({ ok: true, chat });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
