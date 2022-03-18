import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  const cleanId = +id.toString();

  const product = await client.product.findUnique({
    where: {
      id: cleanId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const terms = product?.name.split(' ').map((word) => ({
    name: {
      contains: word,
    },
  }));

  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: cleanId,
        },
      },
    },
  });

  res.json({ ok: true, product, relatedProducts });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);