const express = require('express');
const colors = require('colors');
const connectDB = require('./config/db_config');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 5050

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Routes
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/ticket', require('./routes/ticketRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))

app.use(errorHandler)

app.get('/', (req, res) => {
    res.json({msg : 'WELCOME TO COMPLAINT BOX API 2.O'})
})

app.listen(PORT, ()=> {
    console.log(`Server is running at PORT : ${PORT}`.bgCyan.yellow)
})