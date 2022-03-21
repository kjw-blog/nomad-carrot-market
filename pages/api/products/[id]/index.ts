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
    session: { user },
  } = req;
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
  const isLiked = Boolean(
    await client.fav.findFirst({
      where: {
        productId: cleanId,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );

  res.json({ ok: true, product, isLiked, relatedProducts });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);

/**
 * 상품 상세 데이터 가져오는 api
 *
 * 동작순서
 * 1. url과 session에서 상품id와 유저정보를 가져온다.
 * 2. req.query의 값은 string 혹은 string[] 타입으로 들어가있기 때문에 number 타입으로 값을 변경해준다.
 * 3. query 에서 가져온 id로 해당 상품의 데이터를 일부 유저정보와 함께 가져온다.
 * 4. 비슷한 상품조회를 위해 상품의 이름을 띄워쓰기 단위로 나누어서 배열을 생성해 준 후 해당 들어가는 이름을 조회한다. (현재 id와 같은 값은 제외)
 * 5. 해당상품의 id와 user의 id로 해당 상품의 좋아요 여부를 boolean 타입으로 가져온다.
 * 6. client 에 ok:true , 상품 데이터, 비슷한 상품 데이터, 좋아요 여부를 내려준다.
 *
 */
