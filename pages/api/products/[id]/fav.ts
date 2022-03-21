import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  const alreadyExists = await client.fav.findFirst({
    where: {
      productId: +id.toString(),
      userId: user?.id,
    },
  });
  if (alreadyExists) {
    await client.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }

  res.status(200).json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);

/**
 * 좋아요 버튼 클릭 api
 *
 * 동작순서
 * 1. url과 session에서 받아온 상품id , 유저id를 이용해 해당 상품 좋아요 데이터가 있는지 확인한다.
 * 2. 만약 데이터가 있다면 해당 데이터를 삭제한다 (좋아요 취소)
 * 3. 데이터가 없다면 상품id,유저id를 이용해서 데이터를 생성해준다. (좋아요)
 * 4. client에 ok:true 데이터를 내려준다.
 *
 */
