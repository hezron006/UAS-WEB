const express = require ('express')
const app = express()
const cors = require ('cors')
const bodyParser = require('body-parser')
const PostRouter = require("./router/PostRouter")
require('dotenv').config()

const cookieParser = require('cookie-parser');
app.use(cookieParser());




app.use(cors({
  origin: ['https://jadwal-lovat.vercel.app', 'http://localhost:3000'], // Ganti dengan domain frontend Anda
  credentials: true, // Mengizinkan pengiriman cookie dan header Authorization
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