import * as dotenv from 'dotenv';

dotenv.config({path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : `.env`});

export default {
  secret: process.env.JWT_SECRET || 'your-secret-key',
};
