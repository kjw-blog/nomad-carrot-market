import { NextApiRequest, NextApiResponse } from 'next';

import client from '@libs/server/client';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'POST') {
    const {
      body: { question },
      session: { user },
    } = req;

    const post = await client.post.create({
      data: {
        question,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.status(200).json({ ok: true, post });
  }
}

export default withApiSession(
  withHandler({
    methods: ['POST', 'GET'],
    handler,
  })
);

/**
 * 동작순서
 *
 * 1. request에서 받아온 method를 구분한다. (강의엔 없지만 나중에 GET으로 리스트를 가져올거같아서 해줌)
 *
 * POST ( 게시글(동네생활) 작성 )
 *  2. request에서 body의 question, session의 user 데이터를 가져온다.
 *  3. 해당 값으로 post를 만들어준다.
 *  4. client에 post값을 전달해준다. (게시글 작성 후 해당 게시글 페이지로 바로 이동하기위해서)
 */
