const express = require ('express')
const app = express()
const cors = require ('cors')
const bodyParser = require('body-parser')
const PostRouter = require("./router/PostRouter")
require('dotenv').config()

const cookieParser = require('cookie-parser');
app.use(cookieParser());

  

app.use(cors({
    origin: 'https://jadwal-lovat.vercel.app',  // Domain frontend Anda
    credentials: true,  // Memungkinkan pengiriman kredensial (cookies)
  }));
  
  app.use((req, res, next) => {
    // Memastikan hanya domain tertentu yang diizinkan
    res.header("Access-Control-Allow-Origin", "https://jadwal-lovat.vercel.app");
    
    // Mengizinkan header tertentu
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    // Mengizinkan metode tertentu
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    // Mengizinkan cookies (credentials) dikirimkan
    res.header("Access-Control-Allow-Credentials", "true");

    // Melanjutkan ke route berikutnya
    next();
});
  
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/post', PostRouter)

app.get('/', (req, res) => {
    res.send("Server berjalan dengan baik!");
  });

const port = process.env.PORT
module.exports = app || port 

// app.listen(port, ()=> {
//     console.log("server jalan", port)
// })