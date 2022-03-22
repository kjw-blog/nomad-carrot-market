import client from '@libs/server/client';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const products = await client.product.findMany({
      include: {
        _count: {
          select: {
            favs: true,
          },
        },
      },
    });

    res.status(200).json({
      ok: true,
      products,
    });
  }

  if (req.method === 'POST') {
    const {
      body: { name, price, description },
      session: { user },
    } = req;

    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: 'xx',
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.status(200).json({ ok: true, product });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);

/**
 * 동작순서
 *
 * 1. request에서 client에서 api를 호출한 방식을 구분한다.
 *
 * GET (상품 리스트)
 *  2. 모든 상품 데이터를 상품에 좋아요 개수와 함께 가져온다.
 *  3. client에 가져온 데이터를 뿌려준다.
 *
 * POST (상품 등록)
 *  2. request에서 body에 들어온 값과 session 에 있는 user데이터를 가져온다.
 *  3. 해당 값들과 user데이터의 id로 상품을 생성한다.
 *  4. client에 방금 만든 상품 데이터를 뿌려준다. ( 상품 상세페이지로 이동하기 위해. id만 뿌려줘도 될 것 같다 )
 *
 */
