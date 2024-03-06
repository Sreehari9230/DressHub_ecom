const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/DressHub')

const express = require('express');
const app = express();
// const bodyparser = require('body-parser')
const nocache = require('nocache');
const path = require('path');
const session = require('express-session');
require("dotenv").config();
const port = 3000


// -----SET VIEW ENGINE-----//

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'view'));

app.use(nocache());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(path.join(__dirname, 'public')));

//------SESSION-----//

app.use(session({
    secret: process.env.SECRET || 'defaultSecret', // Use environment variable or a default secret
    saveUninitialized: false, // Prevent saving uninitialized sessions
    resave: false // Prevent saving session on each request
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());



const userRoute = require('./routes/userRoute')  
app.use('/', userRoute)

const adminRoute = require('./routes/adminRoute')
app.use("/admin",adminRoute)


app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
    console.log(`server running on http://localhost:${port}/admin`);
})
