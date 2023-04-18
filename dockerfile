FROM node:16-alpine3.15

RUN mkdir -p /app
# /app 디렉토리를 WORKDIR 로 설정
WORKDIR /app
# 현재 Dockerfile 있는 경로의 모든 파일을 /app 에 복사
ADD . /app

ENV NODE_ENV local

COPY package*.json ./

RUN yarn install

EXPOSE 8080

CMD [ "yarn", "start:local" ]