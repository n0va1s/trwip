FROM node:alpine

RUN mkdir /app
ADD package.json app/package.json
WORKDIR /app
RUN apk add --update alpine-sdk python \
    && npm i \
    && npm rebuild bcrypt --build-from-source
ADD . /app

EXPOSE 3000

CMD ["yarn", "run", "dev"]
