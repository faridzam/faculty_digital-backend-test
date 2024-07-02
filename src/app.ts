import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import * as http from 'http';
import jwt from 'jsonwebtoken';
import { WebSocketServer } from 'ws';
import config from './config/config';
import { getStockController } from './controllers/stockController';
import authRoutes from './routes/authRoutes';

const app: Application = express();
const server = http.createServer(app);

const wss = new WebSocketServer({noServer: true})

server.on('upgrade', (request, socket, head) => {

  console.log(request.headers)
  jwt.verify(request.headers.authorization!, config.secret, (err: any, _: any) => {
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
  origin: "http://89.116.32.70:3004",
  credentials: true,
}));
app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

export { server };

