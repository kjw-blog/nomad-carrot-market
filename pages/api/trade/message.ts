import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { chat, chatId },
    session: { user },
  } = req;

  await client.chatMessage.create({
    data: {
      message: chat,
      User: {
        connect: { id: user?.id },
      },
      chats: {
        connect: {
          id: chatId,
        },
      },
    },
  });

  res.status(200).json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);
