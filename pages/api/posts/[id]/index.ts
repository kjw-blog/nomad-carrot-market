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
  const isWonder = Boolean(
    await client.wondering.findFirst({
      where: {
        postId: +id.toString(),
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );

  return res.status(200).json({ ok: true, post, isWonder });
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
 * 3. 해당 게시글을 작성한 유저와 답변 데이터, 답변 수, 궁금해요 수를 함께 가져 온다.
 * 4. 해당 게시글의 id와 session user의 id로 궁금해요 여부를 boolean값으로 가져온다.
 * 5. client에 해당 데이터를 post로 뿌려준다.
 */
