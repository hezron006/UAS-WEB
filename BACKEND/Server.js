const express = require ('express')
const app = express()
const cors = require ('cors')
const bodyParser = require('body-parser')
const PostRouter = require("./router/PostRouter")
require('dotenv').config()
const helmet = require('helmet');
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
      defaultSrc: ["'self'"], // Membolehkan hanya sumber dari domain yang sama
      scriptSrc: ["'self'", "https://vercel.live"], // Membolehkan skrip dari domain sendiri dan vercel.live
      imgSrc: ["'self'", "https://api-jadwal.vercel.app"], // Membolehkan gambar dari domain sendiri dan api-jadwal.vercel.app
      connectSrc: ["'self'", "https://api-jadwal.vercel.app"], // Membolehkan koneksi API ke api-jadwal.vercel.app
      styleSrc: ["'self'", "'unsafe-inline'"], // Membolehkan CSS dari domain sendiri dan inline styles
      fontSrc: ["'self'"], // Membolehkan font dari domain sendiri
      objectSrc: ["'none'"], // Menghindari penggunaan objek (misalnya Flash)
  },
}));


const cookieParser = require('cookie-parser');
app.use(cookieParser());




app.use(cors({
  origin: 'https://jadwal-lovat.vercel.app', // Sesuaikan dengan domain frontend
  credentials: true, // Izinkan pengiriman cookie dan header Authorization
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://jadwal-lovat.vercel.app'); // Sesuaikan dengan domain frontend
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
  
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/post', PostRouter)

app.get('/', (req, res) => {
    res.send("Server berjalan dengan baik!");
  });

// const port = process.env.PORT
module.exports = app 


// app.listen(port, ()=> {
//     console.log("server jalan", port)
// })