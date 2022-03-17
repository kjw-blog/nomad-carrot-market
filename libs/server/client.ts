import { PrismaClient } from '@prisma/client';

declare global {
  var client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.client = client;

// 서버 재시작 할 때 마다 PrismaClient가 생기는 문제 방지

export default client;
