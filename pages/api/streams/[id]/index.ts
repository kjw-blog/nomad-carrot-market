import { NextApiRequest, NextApiResponse } from 'next';

import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import withHandler from '@libs/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  const stream = await client.stream.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      messages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              avatar: true,
              id: true,
            },
          },
        },
      },
    },
  });

  if (!stream) {
    return res.status(404).json({ ok: false, error: '404 Not Found' });
  }

  res.status(200).json({ ok: true, stream });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
