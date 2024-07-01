import * as dotenv from 'dotenv';

dotenv.config({path: `.env.${process.env.NODE_ENV}` || `.env`});

export default {
  secret: process.env.JWT_SECRET || 'your-secret-key',
};
