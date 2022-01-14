FROM node:17.1.0-alpine3.12

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --silent

COPY . .

RUN apk add --update --no-cache \
    python3 \
    make \
    g++



CMD ["npm", "run", "start:dev"]
