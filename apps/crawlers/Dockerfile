FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

COPY apps/crawlers apps/crawlers
COPY libs libs

RUN yarn install

RUN yarn run build crawlers

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/crawlers/main"]



