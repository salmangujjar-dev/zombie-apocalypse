FROM node:18-alpine

RUN mkdir -p /apps/zombie-apocalypse/client

WORKDIR /apps/zombie-apocalypse/client

COPY package.json .

RUN npm install

COPY ./public ./public
COPY ./src ./src

EXPOSE 3000

CMD ["npm", "start"]