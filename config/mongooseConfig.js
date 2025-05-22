const mongoose = require("mongoose");
const debug = require('debug')('development:mongooseConnection')

;(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/scatch`)
        .then(()=>{
            console.log("Database connected!");
        })
        .catch((err)=>{
            console.log("Database not connected! ", err);
        })
    } catch(err) {
        console.log(err.message)
    }
})()

module.exports = mongoose.connection;