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
  } = req;

  const post = await client.post.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          avatar: true,
          name: true,
          id: true,
        },
      },
      answers: {
        select: {
          id: true,
          answer: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          wonderings: true,
        },
      },
    },
  });

  return res.status(200).json({ ok: true, post });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);

/**
 * 동작순서 (게시글 상세 데이터 가져오기)
 *
 * 1. request query에서 id를 가져온다.
 * 2. 가져온 id를 uniqueKey로 사용해서 게시글 데이터를 가져온다
 * 3. 해당 게시글을 작성한 유저와 답변 데이터, 답변 수, 궁금해요 수를 함께 가져온다.
 * 4. client에 해당 데이터를 post로 뿌려준다.
 */
