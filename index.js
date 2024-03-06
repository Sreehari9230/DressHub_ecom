const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/DressHub')

const express = require('express')
const app = express()
const nocache = require('nocache')
const path = require('path')
const session = require('express-session')
const port = 3000
// const bodyparser = require('body-parser')
app.use(nocache())
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: process.env.SECRET || 'defaultSecret', // Use environment variable or a default secret
    saveUninitialized: false, // Prevent saving uninitialized sessions
    resave: false // Prevent saving session on each request
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'view'))

const userRoute = require('./routes/userRoute')
app.use('/', userRoute)

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
})
