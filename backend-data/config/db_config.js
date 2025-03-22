const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        let conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`DB CONNECTION SUCCESS: ${conn.connection.name}`.bgGreen.black)        
    } catch (error) {
        console.log(`DB CONNECTION FAILED : ${error.message}`)
    }
}

module.exports = connectDB;