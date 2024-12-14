const express = require ('express')
const app = express()
const cors = require ('cors')
const bodyParser = require('body-parser')
const PostRouter = require("./router/PostRouter")
require('dotenv').config()

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'none'; img-src 'self' https://api-jadwal.vercel.app;");
  next(); 
});
app.use('/favicon.ico', (req, res) => res.status(204).end());
app.use(express.static('public'));

app.use(cors({
    origin: 'https://jadwal-lovat.vercel.app',  
    credentials: true,  
  }));
  
app.options('*', cors({
    origin: 'https://jadwal-lovat.vercel.app',
    credentials: true,
  }));
  
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/post', PostRouter)

app.get('/', (req, res) => {
    res.send("Server berjalan dengan baik!");
  });

const port = process.env.PORT
module.exports = app 

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});