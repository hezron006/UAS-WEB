const express = require ('express')
const app = express()
const cors = require ('cors')
const bodyParser = require('body-parser')
const PostRouter = require("./router/PostRouter")
require('dotenv').config()

const cookieParser = require('cookie-parser');
app.use(cookieParser());

  

app.use(cors({
    origin: 'https://jadwal-lovat.vercel.app',  
    credentials: true,  
  }));
  
app.options('*', cors({
    origin: 'https://jadwal-lovat.vercel.app',
    credentials: true,
  }));
  
  const helmet = require('helmet');

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://vercel.live"],
        styleSrc: ["'self'"],
    },
}));
  
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