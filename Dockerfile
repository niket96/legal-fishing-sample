FROM node:latest

WORKDIR /usr/src/legal

COPY . .
RUN npm install
RUN npm run build

