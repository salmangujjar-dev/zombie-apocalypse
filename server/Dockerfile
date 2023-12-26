FROM node:18-alpine

RUN mkdir -p /apps/zombie-apocalypse/server

WORKDIR /apps/zombie-apocalypse/server

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]