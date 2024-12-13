const express = require ('express')
const app = express()
const cors = require ('cors')
const bodyParser = require('body-parser')
const PostRouter = require("./router/PostRouter")
require('dotenv').config()






app.use(cors({
  origin: 'https://jadwal-lovat.vercel.app', // Ganti dengan domain frontend Anda
  credentials: true, // Mengizinkan pengiriman cookie dan header Authorization
}));

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 
    "default-src 'none'; script-src 'self' https://vercel.live; img-src 'self' https://api-jadwal-pkl66fmn0-hezron006s-projects.vercel.app; connect-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self';"
  );
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