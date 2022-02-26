const express = require('express');
const helmet  = require('helmet');
const mongoose  = require('mongoose');
const morgan = require('morgan');
const dotenv = require("dotenv");
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const multer = require("multer")
const cors = require('cors');
const path = require('path')

const app = express();


dotenv.config()

mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log("database connected")
});

app.use("/images", express.static(path.join(__dirname, "public/images")) )

// blocking cors errors:
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//file upload
const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb)=>{
        cb(null, req.body.name);
    },
})

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
    try {
        return res.status(200).json("File uploaded Successful")
    } catch (error) {
        console.log(error);
    }
})

//apis
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)



app.listen(process.env.PORT, ()=>{
    console.log(`${process.env.PORT} running`)
})
//yo0eZhKIiyYSH6LM