import { NextApiRequest, NextApiResponse } from 'next';

import client from '@libs/server/client';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { name, price, description },
  } = req;

  if (req.method === 'POST') {
    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.status(200).json({ ok: true, stream });
  } else if (req.method === 'GET') {
    const page = +req.query.page - 1;

    const streams = await client.stream.findMany({
      take: 25,
      skip: 25 * page,
    });

    res.status(200).json({ ok: true, streams });
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
 * 1. request에서 받아온 method를 구분한다.
 *
 * POST ( LIVE STREAM 생성 )
 *  2. request에서 body의 name,price,description, session의 user 데이터를 가져온다.
 *  3. 해당 값으로 stream을 만들어준다.
 *  4. client에 생성한 stream을 전달해준다.
 *
 * GET (LIVE STREAM 리스트 가져오기)
 *
 */
