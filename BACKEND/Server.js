const express = require ('express')
const app = express()
const cors = require ('cors')
const bodyParser = require('body-parser')
const PostRouter = require("./router/PostRouter")
require('dotenv').config()

const cookieParser = require('cookie-parser');
app.use(cookieParser());




app.use(cors({
    origin: '*',  
    credentials: true,  
  }));
  
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