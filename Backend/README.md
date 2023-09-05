## Follow the steps for local installation

## ENV setup

Create .env file in root folder and copy and paste below code.

`DB_CONNECT = "mongodb://localhost:27017/datapolish"`
`JWT_SECRET = "secretKey"`

## Install Mongodb locally

## For window, Ubuntu and Mac

`https://docs.mongodb.com/compass/current/install/`


## Clone code

First of all clone code from git

## Install dependencies

Run `npm install` command root of the project.


## Development server

Run `nodemon app.js` for a dev server. Navigate to `http://localhost:8000/`. The api will automatically reload if you change any of the source files, and this api url is connected with frontend.
