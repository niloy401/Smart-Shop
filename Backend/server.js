const app = require('./app')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv');

//Handling uncaught exception
process.on('uncaughtException', err => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting Down server due to prblem')
  process.exit(1)
})

//setting up config files
dotenv.config({ path: 'Backend/config/config.env' });


//Connecting to database

connectDatabase();

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