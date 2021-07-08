FROM node:14.17.0-alpine3.13

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production

COPY . .
RUN yarn build

EXPOSE 3000

ENV ENV_FILE=config/.env.prod

CMD ["node", "-r", "tsconfig-paths/register", "bin/server.js"]
