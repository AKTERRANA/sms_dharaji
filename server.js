require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path')

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.jwtSecret;

//ROUTER
const userRouter = require("./routers/userRouter")
const admRouter = require("./routers/admRouter")
const infraRouter = require("./routers/infraRouter")
const newsRouter = require("./routers/newsRouter")
const datesRouter = require("./routers/datesRouter");
const { auth } = require("./auth/auth");

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser())
const corsOptions = {
    exposedHeaders: 'Authorization'
  };
app.use(cors(corsOptions))


// MONGOOSE
const mongoUrl = process.env.MONGODB_URL;
mongoose.set('strictQuery', true);
mongoose.connect(`${mongoUrl}`, ()=>{
    console.log('MONGODB CONNECTED SUCCESSFULLY.')
}).catch((e)=>{
    console.log("ERROR IN MONGODB =>", e)
})

app.use(express.static(path.join(__dirname, 'build')))
// app.use((req,res, next)=>{
//     console.log(req.cookies, "Cookies in Server.js")
//     next()
// })
const authentiate = (req, res, next)=>{
    let token =  req.header("Authorization");
        console.log("token", token)
        if(!token){
           res.status(401).json({message: "You Are Not Authorized!"})
        }else{
            jwt.verify(token,jwtSecret, (err, decoded)=>{
                if(!err){
                    req.user = decoded;
                    console.log(decoded, "decoded")
                    next();
                }else{
                    res.status(400).json({message: "You are not Authorized"})
                }
            } )
        }
}


// app.use("/api/products", )
app.use("/api/user", userRouter );
app.use("/api/infra", infraRouter);
app.use("/api/dates", datesRouter);
app.use("/api/news", newsRouter);
app.use("/api/adm", admRouter);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server is running at PORT ${port}`)
})