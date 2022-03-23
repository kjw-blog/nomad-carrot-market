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
    body: { answer },
    session: { user },
  } = req;

  const post = await client.post.findUnique({
    where: {
      id: +id.toString(),
    },
  });
  if (!post) return res.status(404).json({ ok: false, error: '404 Not Found' });

  const newAnswer = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: +id.toString(),
        },
      },
      answer,
    },
  });

  res.status(200).json({ ok: true, answer: newAnswer });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);

/**
 * 동작순서 (댓글등록)
 * 1. request에서 게시글 id, 세션의 유저정보, body의 data(answer) 을 가져온다.
 * 2. 받아온 게시글 id로 게시글을 찾아서, 게시글이 없으면 client에 404에러를 보내준다.
 * 3. 게시글이 있으면 request에서 받아온 데이터로 댓글을 생성해준다.
 * 4. client에 ok:true 와 만들어진 댓글을 뿌려준다.
 *
 */
