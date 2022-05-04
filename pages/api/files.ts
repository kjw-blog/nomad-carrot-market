import { NextApiRequest, NextApiResponse } from 'next';

import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import client from '@libs/server/client';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ ok: true, url: '' });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);
