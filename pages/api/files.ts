import { NextApiRequest, NextApiResponse } from 'next';

import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import client from '@libs/server/client';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.CF_TOKEN}` },
      }
    )
  ).json();

  res.status(200).json({ ok: true, ...response.result });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
