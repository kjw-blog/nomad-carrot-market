import twilio from 'twilio';
import mail from '@sendgrid/mail';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';

console.log(process.env.SENDGRID_KEY!);

mail.setApiKey(process.env.SENDGRID_KEY!);
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
// twilio 계정에서 sid , token 을 받아와서 twilio를 생성해준다.

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
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
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `당신의 로그인 토큰은 ${payload}입니다.`,
    });
    console.log(message);
    // twilio에서 메세지 서비스 sid 를 받아와서 to(보낼 번호) , body(보낼 메세지) 를 정해준다
    // 휴대폰번호에 82를 꼭 추가해줘야한다(대한민국)
  } else if (email) {
    const email = await mail.send({
      from: 'rkdwjddnr11@naver.com',
      to: 'rkdwjddnr11@naver.com',
      subject: '캐럿마켓 인증 이메일',
      text: `당신의 로그인 토큰은 ${payload}입니다.`,
      html: `<strong>당신의 로그인 토큰은 ${payload}입니다.</strong>`,
    });
    // subject 메일의 제목 , text or html 에 내용을 적어준다. html과 text를 같이 추가하면 html만 적용되는거같다.

    console.log(email);
  }

  return res.json({ ok: true });
}

export default withHandler('POST', handler);
