# Instructions

## Required npm Packages

`You can also use package.json to install packages for client and server`

### Alternative

### - Server

- express
- nodemon
- body-parser
- cors
- dotenv
- mongoose
- jsonwebtoken
- multer
- bcrypt

`npm install express nodemon body-parser cors dotenv mongoose jsonwebtoken multer bcrypt`

### - Client

- axios
- @mui/material
- @emotion/react
- @emotion/styled
- @mui/icons-material
- @mui/styled-engine-sc
- styled-components
- react-router-dom
- react-toastify
- react-google-charts

`cd client && npm install axios @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/styled-engine-sc styled-components react-router-dom react-toastify react-google-charts`

## Code Execution

### - Server

`npm start`

### - Client

`cd client && npm start`

## Dockerization

### - Pre Prequisite

- Make sure docker and docker compose is installed.
- To install Docker Compose\
  `sudo apt install docker-compose`

### - Build

`docker compose build`

### - Run

`docker compose up`

### Note

- Following are the ports being used\
  `27017` for MongoDB\
  `3000` for Server\
  `30001` for Client
