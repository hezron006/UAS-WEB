const express = require ('express')
const app = express()
const cors = require ('cors')
const bodyParser = require('body-parser')
const PostRouter = require("./router/PostRouter")
require('dotenv').config()

const cookieParser = require('cookie-parser');
app.use(cookieParser());

  

const corsOptions = {
    origin: ['https://jadwal-lovat.vercel.app'], // Tambahkan domain frontend Anda
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode HTTP yang diizinkan
    allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
    credentials: true, // Jika menggunakan cookie
  };
  
  app.use(cors(corsOptions));
  
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/post', PostRouter)

app.get('/', (req, res) => {
    res.send("Server berjalan dengan baik!");
  });

const port = process.env.PORT
module.exports = app; 

// app.listen(port, ()=> {
//     console.log("server jalan", port)
// })