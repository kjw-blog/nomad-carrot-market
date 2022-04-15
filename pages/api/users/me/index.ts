import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const profile = await client.user.findUnique({
      where: {
        id: req.session.user?.id,
      },
    });

    res.json({
      ok: true,
      profile,
    });
  }
  if (req.method === "POST") {
    const {
      session: { user },
      body: { email, phone, name },
    } = req;

    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        email: true,
        phone: true,
      },
    });

    if (email && email !== currentUser?.email) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        })
      );
      if (alreadyExists) {
        res.json({ ok: false, error: "이미 사용중인 이메일입니다." });
      }
      await client.user.update({
        where: { id: user?.id },
        data: {
          email,
        },
      });
      res.json({ ok: true });
    }
    if (phone && phone !== currentUser?.phone) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            phone,
          },
          select: {
            id: true,
          },
        })
      );
      if (alreadyExists) {
        return res.json({
          ok: false,
          error: "이미 사용중인 휴대폰 번호입니다.",
        });
      }
      await client.user.update({
        where: { id: user?.id },
        data: {
          phone,
        },
      });
      res.json({ ok: true });
    }
    if (name) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name,
        },
      });
    }

    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);

/**
 * 동작순서
 * 1. request에서 client에서 api를 호출한 방식을 구분한다.
 *
 * GET (유저 정보)
 *  2. 세션에 저장돼있는 user의 id로 user테이블에서 데이터를 받아온다.
 *  3. 클라이언트에 ok:true 와 세션에서 받아온 id로 user테이블에서 받아온 데이터를 보내준다.
 *
 * POST (유저 정보 수정)
 *  2. 세션에 저장돼있는 user의 id로 user테이블에서 데이터를 받아온다.
 *  3. 클라이언트에서 받아온 데이터가 있고, 해당 데이터와 기존 데이터가 상이하면 받아온 데이터로 다시 유저를 검색한다.
 *  4. 만약 해당 유저 데이터가 이미 있으면 클라이언트에 에러를 보내주고, 없으면 받아온 데이터로 유저 정보를 업데이트한다.
 *  5. 이름은 중복이 가능하기 때문에 중복체크를 하지 않는다.
 */

// 세션 유무를 체크안하는 이유는 나중에 세션 유무에 따라 로그인페이지 , 당근마켓 사용페이지 를 나누어서 그런거같다
