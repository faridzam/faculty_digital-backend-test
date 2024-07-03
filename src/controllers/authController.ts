import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { ApiResponseBody } from '../models/apiResponse';
import { loginUser } from '../services/authService';

dotenv.config({path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : `.env`});

export const login = async (req: Request, res: Response<ApiResponseBody>) => {
  const { username, password } = req.body;

  try {
    const token = await loginUser(username, password);

    if (token) {
      res.cookie('token', token, { maxAge: 3600000 * 24, domain: process.env.DOMAIN, path: '/', httpOnly: false, sameSite: "lax", secure: false, signed: true})
      res.status(200).json({
        code: 200,
        status: 'success',
        message: 'Login success!',
        data: {
          token
        }
      });
    } else {
      res.status(401).json({
        code: 401,
        status: 'failed',
        message: 'Invalid credentials!',
        data: null
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: 'failed',
      message: `Internal server error: ${error}`,
      data: null
    });
  }
};

export const checkAuth = async (req: Request, res: Response<ApiResponseBody>) => {
  const token = req.signedCookies['token']
  try {
    jwt.verify(token, config.secret, (err: any, auth: any) => {
      if (err) {
        res.status(401).json({
          code: 401,
          status: 'failed',
          message: 'Not logged in!',
          data: null
        });
      } else {
        res.status(200).json({
          code: 200,
          status: 'success',
          message: 'Authorized!',
          data: {
            user: auth.user,
            company: auth.company,
            role: auth.role,
          }
        });
      }
    });

  } catch (error) {
    res.status(500).json({
      code: 500,
      status: 'failed',
      message: `Internal server error: ${error}`,
      data: null
    });
  }
};