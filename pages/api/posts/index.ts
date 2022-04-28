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
      body: { question, longitude, latitude },
      session: { user },
    } = req;

    const post = await client.post.create({
      data: {
        question,
        longitude,
        latitude,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.status(200).json({ ok: true, post });
  }
  if (req.method === 'GET') {
    const {
      query: { longitude, latitude },
    } = req;

    const parseLatitude = parseFloat(latitude.toString());
    const parseLongitude = parseFloat(longitude.toString());

    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            answers: true,
            wonderings: true,
          },
        },
      },
      where: {
        longitude: {
          gte: parseLongitude - 0.01,
          lte: parseLongitude + 0.01,
        },
        latitude: {
          gte: parseLatitude - 0.01,
          lte: parseLatitude + 0.01,
        },
      },
    });
    res.status(200).json({ ok: true, posts });
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
 * 1. request에서 받아온 method를 구분한다.
 *
 * POST ( 게시글(동네생활) 작성 )
 *  2. request에서 body의 question,latitude,longitude, session의 user 데이터를 가져온다.
 *  3. 해당 값으로 post를 만들어준다.
 *  4. client에 post값을 전달해준다. (게시글 작성 후 해당 게시글 페이지로 바로 이동하기위해서)
 *
 * GET (게시글 리스트)
 *  2. 유저정보, 답변수,궁금해요수가 포함된 모든 게시글 데이터를 가져온다.
 *  3. client에 해당값을 내려준다.
 *
 */
