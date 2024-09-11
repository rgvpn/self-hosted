FROM node:21-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
COPY .env .env

CMD ["yarn", "start"]
