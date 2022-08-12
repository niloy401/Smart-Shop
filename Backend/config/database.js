
const mongoose = require('mongoose');


const connectDatabase = () => {
   mongoose.connect(process.env.DB_LOCAL_URI,{
      
   }).then(con => {
      console.log(`MongoDB database is connected to HOST: ${con.connection.host}`)
     })
     
     
      
    
     

}

module.exports = connectDatabase


