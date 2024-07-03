import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import * as http from 'http';
import jwt from 'jsonwebtoken';
import { WebSocketServer } from 'ws';
import config from './config/config';
import { getStockController } from './controllers/stockController';
import authRoutes from './routes/authRoutes';

dotenv.config({path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : `.env`});

const app: Application = express();
const server = http.createServer(app);

const wss = new WebSocketServer({server})

server.on('upgrade', (request, socket, head) => {

  const tokenHeader = request.headers.cookie?.split('; ').find((cookie: string) => cookie.startsWith('token'))?.split('=')[1];

  const token = cookieParser.signedCookie(
    decodeURIComponent(tokenHeader!),
    process.env.JWT_SECRET!,
  );

  if (token) {
    jwt.verify(token as string, config.secret, (err: any, _: any) => {
      if (err) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
        socket.destroy()
        return
      } else {
        wss.handleUpgrade(request, socket, head, connection => {
          wss.emit('connection', connection, request)
        })
      }
    })
  } else {
    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
    socket.destroy()
    return
  }
})

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  
  setInterval(async () => {
    await getStockController().then((response) => {
      ws.send(JSON.stringify(response))
    });
  }, 2000)

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('wss connected');

});

app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true,
}));

app.use(bodyParser.json());

app.use(cookieParser(process.env.JWT_SECRET))

app.use('/auth', authRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

export { server };

