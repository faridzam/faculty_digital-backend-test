import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { ApiResponseBody } from '../models/apiResponse';
import { extractAuthHeader } from '../utils/helper';

export const authenticateToken = (req: Request, res: Response<ApiResponseBody>, next: NextFunction) => {
  const token = extractAuthHeader(req.headers['authorization']);

  if (!token) {
    return res.status(401).json({
      code: 401,
      status: 'failed',
      message: 'Unauthorized!',
      data: null
    });
  }

  jwt.verify(token, config.secret, (err, auth) => {
    if (err) {
      return res.status(403).json({
        code: 403,
        status: 'failed',
        message: 'Forbidden!',
        data: null
      });
    }

    req.body.auth = auth;
    next();
  });
};
