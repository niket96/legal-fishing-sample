FROM node:latest

WORKDIR /usr/src/legal

COPY . .
RUN npm install

