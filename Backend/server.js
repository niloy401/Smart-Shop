const app = require('./app')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

//Handling uncaught exception
process.on('uncaughtException', err => {
  console.log(`Error: ${err.stack}`);
  console.log('Shutting Down server due to prblem')
  process.exit(1)
})

//setting up config files
dotenv.config({ path: 'Backend/config/config.env' });


//Connecting to database

connectDatabase();

//Setting up cloudinary configuration
cloudinary.config({
  cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


const server = app.listen (process.env.PORT, () => {
  console.log(`Server has Satrted on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//Handling unhandled promise rejections

process.on('unhandledRejection', err => {
  console.log(`Error: ${err.stack}`);
  console.log('Shutting down the server due to unhandled promise rejection');

  server.close(() => {
    process.exit(1);
  })

})