// library
import * as dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

export const config = {
  HOST: process.env.HOST,
  DB_PORT: process.env.DB_PORT,
  SERVER_PORT: process.env.SERVER_PORT,
  SECRET_ACCESS: process.env.SECRET_ACCESS,
  SECRET_REFRESH: process.env.SECRET_REFRESH,
  EXPIRES_IN: process.env.EXPIRES_IN_ACCESS,
  EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH,
  FE_URL: String(process.env.FE_URL),
};
