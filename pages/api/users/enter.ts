import twilio from 'twilio';
import mail from '@sendgrid/mail';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';

mail.setApiKey(process.env.SENDGRID_KEY!);
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
// twilio 계정에서 sid , token 을 받아와서 twilio를 생성해준다.

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + '';

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'Anonymous',
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.MY_PHONE!,
    //   body: `당신의 로그인 토큰은 ${payload}입니다.`,
    // });
    // console.log(message);
    // twilio에서 메세지 서비스 sid 를 받아와서 to(보낼 번호) , body(보낼 메세지) 를 정해준다
    // 휴대폰번호에 82를 꼭 추가해줘야한다(대한민국)
  } else if (email) {
    // const email = await mail.send({
    //   from: 'rkdwjddnr11@naver.com',
    //   to: 'rkdwjddnr11@naver.com',
    //   subject: '캐럿마켓 인증 이메일',
    //   text: `당신의 로그인 토큰은 ${payload}입니다.`,
    //   html: `<strong>당신의 로그인 토큰은 ${payload}입니다.</strong>`,
    // });
    // subject 메일의 제목 , text or html 에 내용을 적어준다. html과 text를 같이 추가하면 html만 적용되는거같다.
    // console.log(email);
  }

  return res.json({ ok: true });
}
export default withHandler({
  methods: ['POST'],
  handler,
  isPrivate: false,
});

/**
 * 동작순서
 * 1. 클라이언트에게 phone또는 email을 받아와서 user 변수에 저장한다.
 * 2. 만약 phone 과 email을 모두 못받아왔으면 함수실행을 종료한다.
 * 3. 6자리의 랜덤한 수로 토큰을 만들어준다.
 * 4. 받아온 user 데이터와 만들어둔 랜덤수 토큰으로 토큰데이터를 생성한다.
 *    이때 user변수값으로 user테이블을 조회해서 데이터가 있으면 값을 가져오고 없으면 생성해준다. (connectOrCreate)
 * 5. 클라이언트에서 받아온 값에 따라 사용자에게 토큰을 전송한다.
 * 6. 클라이언트에 ok:true를 보내준다.
 */
