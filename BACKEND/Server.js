const express = require ('express')
const app = express()
const cors = require ('cors')
const bodyParser = require('body-parser')
const PostRouter = require("./router/PostRouter")
require('dotenv').config()

app.use(session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: 'None', // Agar bisa bekerja lintas situs
      secure: true,     // Pastikan Anda menggunakan HTTPS
    },
  }));
  

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
  
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