import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import withHandler from '@libs/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  const _id = +id.toString();

  const chat = await client.chats.findUnique({
    where: {
      id: _id,
    },
    include: {
      message: true,
      product: {
        select: {
          user: {
            select: {
              name: true,
              avatar: true,
              id: true,
            },
          },
        },
      },
      buyer: {
        select: {
          name: true,
          avatar: true,
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
