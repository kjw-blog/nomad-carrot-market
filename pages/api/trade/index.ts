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
    const {
      session: { user },
    } = req;

    const chats = await client.chats.findMany({
      where: {
        OR: [
          {
            buyerId: user?.id,
          },
          {
            product: {
              userId: user?.id,
            },
          },
        ],
      },
      include: {
        buyer: {
          select: {
            avatar: true,
            name: true,
          },
        },
        product: {
          select: {
            user: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
        },
        message: {
          select: {
            message: true,
          },
        },
      },
    });

    res.status(200).json({ ok: true, chats });
  }
}

export default withApiSession(
  withHandler({
    methods: ['POST', 'GET'],
    handler,
  })
);
