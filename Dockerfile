FROM node:16-alpine3.11

WORKDIR /app

COPY . ./

RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn install
RUN yarn build