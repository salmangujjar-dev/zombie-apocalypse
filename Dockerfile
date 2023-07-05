FROM node:18-alpine

RUN mkdir -p /Documents/trainee-test-project/server

WORKDIR /Documents/trainee-test-project/server

COPY ./package.json .

RUN npm install

COPY ./server ./server

EXPOSE 3001

CMD ["npm", "start"]