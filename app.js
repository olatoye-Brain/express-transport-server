const express = require('express')
const router = require('./route')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const port = process.env.PORT || 8000
const bodyParser = require('body-parser')
//Adding file upload


dotenv.config()

const DB_CONNECT = process.env.MONGO_URI
mongoose.connect(DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true })
.then(()=> console.log('MongoDB Connected!'))
.catch(err=> console.log(`Error : ${err}`))



// app.use(express.json())
app.use(cors())

app.use(express.urlencoded({extended: false}))
app.use(express.json());
// app.use(express.urlencoded({limit: '25mb'}));


app.use(router)
// parse application/json
app.use(bodyParser.json())




app.listen(port, ()=>{
    console.log(`App is listening to port ${port}`)
})