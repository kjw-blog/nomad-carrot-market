// api 호출 시 발생하는 오류를 처리해주는 함수
// children이랑 비슷한거같다

import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface ConfigType {
  method: 'GET' | 'POST' | 'DELETE';
  handler: (req: NextApiRequest, res: NextApiResponse<ResponseType>) => void;
  isPrivate?: boolean;
}

export default function withHandler({
  method,
  handler,
  isPrivate = true,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method !== method) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: '로그인을 해주세요.' });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
