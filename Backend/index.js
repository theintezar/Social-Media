const express = require('express');
const helmet  = require('helmet');
const mongoose  = require('mongoose');
const morgan = require('morgan');
const dotenv = require("dotenv");
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');


const app = express();


dotenv.config()

mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log("database connected")
});

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//apis
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)




app.listen(1006, ()=>{
    console.log("1006 running")
})
//yo0eZhKIiyYSH6LM