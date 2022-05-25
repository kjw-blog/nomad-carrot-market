import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import withHandler from '@libs/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  const _id = +id.toString();

  const messageCount = await client.chatMessage.findMany({
    where: {
      chatsId: _id,
    },
  });

  console.log(messageCount.length);

  const chat = await client.chats.findUnique({
    where: {
      id: _id,
    },
    include: {
      message: {
        take: 20,
        skip: messageCount.length - 20 < 0 ? 0 : messageCount.length - 20,
        select: {
          message: true,
          userId: true,
          id: true,
        },
      },
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
