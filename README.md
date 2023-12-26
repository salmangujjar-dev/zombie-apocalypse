# Project Description

`In a post-apocalyptic world overrun by zombies, the project revolves around the development of a robust system by the last coding-savvy survivor. The system's goal is to connect and assist remaining humans, detecting infections and facilitating resource sharing. Key functionalities include survivor database management, location updates, profile picture additions, and infection flagging based on reports. Strict rules govern infected survivors' limitations. Inventory management ensures accurate data, allowing trade as the sole means of updating belongings. The system incorporates a search feature, trade mechanism with a defined point system, and a comprehensive trade history. Reports provide crucial statistics on infection percentages, resource averages, and points lost. The project also defines distinct roles, restricting certain functionalities for administrators and survivors.`

- Inventory Management
- Update Survivor Location
- Flag Survivor as Infected
- Trade Functionality
- Trade History
- Roles

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
