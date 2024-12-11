const express = require ('express')
const app = express()
const cors = require ('cors')
const bodyParser = require('body-parser')
const PostRouter = require("./router/PostRouter")

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/post', PostRouter)

module.exports = app; 