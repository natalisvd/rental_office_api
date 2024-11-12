// library
import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  HOST:
    process.env.NODE_ENV === 'production'
      ? process.env.HOST_PROD
      : process.env.HOST_DEV,
  DB_PORT:
    process.env.NODE_ENV === 'production'
      ? Number(process.env.DB_PORT_PROD)
      : Number(process.env.DB_PORT_DEV),
  SERVER_PORT: process.env.SERVER_PORT ?? 3001,
  SECRET_ACCESS: process.env.SECRET_ACCESS,
  SECRET_REFRESH: process.env.SECRET_REFRESH,
  EXPIRES_IN: process.env.EXPIRES_IN_ACCESS ?? '',
  EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH ?? '',
  FE_URL:
    process.env.NODE_ENV === 'production'
      ? String(process.env.FE_URL)
      : 'http://localhost:4200/',
};
