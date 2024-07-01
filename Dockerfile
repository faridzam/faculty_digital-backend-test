FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install -g npm@latest --force
RUN npm install

COPY . .

RUN npm run build:prod
RUN npm run migrate:prod
RUN npm run seed:prod

EXPOSE 8002

CMD [ "npm", "run", "deploy" ]