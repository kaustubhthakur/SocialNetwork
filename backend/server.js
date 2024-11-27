const express = require('express')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const mongoose = require('mongoose')
require('dotenv').config();
const app = express();
const port = 8000
const authrouter = require('./routes/auth')
const userrouter = require('./routes/users')
const postrouter = require('./routes/posts')
app.use(express.json())
app.use(cors())
app.use(cookieparser())

const connection = async()=> 
{
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log('database is connected...')
    } catch (error) {
        console.error(error)
    }
}
connection();
app.use('/auth',authrouter)
app.use('/users',userrouter)
app.use('/posts',postrouter)

app.listen(port,() => {
    console.log(`server is running on port ${port}...`);
})