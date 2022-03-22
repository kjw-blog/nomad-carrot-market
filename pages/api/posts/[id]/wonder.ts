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

  const alreadyExists = await client.wondering.findFirst({
    where: {
      postId: +id.toString(),
      userId: user?.id,
    },
    select: {
      id: true,
    },
  });

  if (alreadyExists) {
    await client.wondering.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.wondering.create({
      data: {
        post: {
          connect: {
            id: +id.toString(),
          },
        },
        user: {
          connect: {
            id: user?.id,
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
 * 동작순서 (궁금해요 버튼 클릭)
 *
 * 1. request에서 user와 게시글 id 를 가져온다.
 * 2. 해당 값들로 궁금해요 데이터가 있는지 확인한다.
 * 3. 데이터가 있으면 해당 데이터를 삭제한다.
 * 4. 데이터가 없으면 user id와 게시글 id로 데이터를 만든다.
 * 5. client에 ok:true 를 뿌려준다
 */
