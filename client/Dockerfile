FROM node:18-alpine

RUN mkdir -p /Documents/trainee-test-project/client

WORKDIR /Documents/trainee-test-project/client

COPY package.json .

RUN npm install

COPY ./public ./public
COPY ./src ./src

RUN ls

EXPOSE 3000

CMD ["npm", "start"]