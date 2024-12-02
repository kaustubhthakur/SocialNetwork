const express = require('express')
const app = express();
const port = 9000;
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();
const authrouter = require('./routes/auth')
const userrouter = require('./routes/users')
const postrouter = require('./routes/posts')
app.use(express.json())
app.use(cors())

const connection = async()=> {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log('database is connected...')
    } catch (error) {
        console.error(error);
    }
}
connection();


app.use('/auth',authrouter)
app.use('/users',userrouter)
app.use('/posts',postrouter)
app.listen(port,()=> {
    console.log(`server is connected to ${port}...`)
})