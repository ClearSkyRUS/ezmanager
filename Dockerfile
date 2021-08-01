FROM node:12-alpine

RUN mkdir -p /home/app/node_modules && chown -R node:node /home/app

WORKDIR /home/app

COPY package*.json ./

RUN yarn

COPY ./src ./src
COPY ./scripts ./scripts
COPY ./public ./public
COPY ./config ./config

EXPOSE 3000 

USER node

CMD yarn start