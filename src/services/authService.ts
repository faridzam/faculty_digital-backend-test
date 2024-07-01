import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import pool from '../config/database';
import { Account } from '../models/account';
import { AuthenticatedUser } from '../models/apiRequest';

export const loginUser = async (username: string, password: string): Promise<string | null> => {
  const resultAccount = await pool.query('SELECT * FROM accounts WHERE username = $1', [username]);

  if (
    resultAccount.rows.length === 0
  ) {
    return null;
  }

  const account = resultAccount.rows[0] as Account;

  const passwordMatch = await bcrypt.compare(password, account.password);

  if (!passwordMatch) {
    return null;
  }

  const token = jwt.sign({ account } as AuthenticatedUser, config.secret, {
    expiresIn: '24h',
  });

  return token;
};