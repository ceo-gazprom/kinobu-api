FROM node:17.1.0-alpine3.12

WORKDIR /usr/src/app

COPY . .

RUN apk add --update --no-cache \
    python3 \
    make \
    g++


RUN npm i

CMD ["npm", "run", "start"]
