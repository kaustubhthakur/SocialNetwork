const express = require('express')
const app = express();
const port = 8000
const cors = require('cors')
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser')
require('dotenv').config()
const postrouter = require('./routes/posts')
const userrouter = require('./routes/users')
const authrouter = require('./routes/auth')
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

const connection =async()=> {
    try {
    await mongoose.connect(process.env.MONGODB);
    console.log('database is connected...')
    } catch (error) {
        console.error(error);
    }
}
connection();
app.use('/auth',authrouter);
app.use('/posts',postrouter);
app.use('/users',userrouter);
app.listen(port,() => {
    console.log(`server is running on port ${port}...`)
})