require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path')


//ROUTER
const userRouter = require("./routers/userRouter")
const admRouter = require("./routers/admRouter")
const infraRouter = require("./routers/infraRouter")
const newsRouter = require("./routers/newsRouter")
const datesRouter = require("./routers/datesRouter");
const aboutRouter = require("./routers/aboutRouter");
const logoRouter = require("./routers/logoRouter");
const contactRouter = require("./routers/contactRouter");
const galleryRouter = require("./routers/galleryRouter");
const welcomeRouter = require("./routers/welcomeRouter");

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
const mongoUrl = process.env.MONGODB_URL || MONGODB_URL;
mongoose.set('strictQuery', true);
mongoose.connect(`${mongoUrl}`, ()=>{
    console.log('MONGODB CONNECTED SUCCESSFULLY.')
}).catch((e)=>{
    console.log("ERROR IN MONGODB =>", e)
})

app.use(express.static(path.join(__dirname, 'public')))


// app.use("/api/products", )

app.use("/api/user", userRouter );
app.use("/api/infra", infraRouter);
app.use("/api/dates", datesRouter);
app.use("/api/news", newsRouter);
app.use("/api/adm", admRouter);
app.use("/api/about", aboutRouter);
app.use("/api/contact", contactRouter);
app.use("/api/logo", logoRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/welcome", welcomeRouter);

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });

const _app_folder = 'public/build';
// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

// ---- SERVE APLICATION PATHS ---- //
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});

  
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server is running at PORT ${port}`)
})