import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    body,
    session: { user },
  } = req;

  const message = await client.message.create({
    data: {
      message: body.message,
      user: {
        connect: {
          id: user?.id,
        },
      },
      stream: {
        connect: {
          id: +id.toString(),
        },
      },
    },
  });

  res.status(200).json({ ok: true, message });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);
