require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser : true })

const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('Connected to Database'))

// for json
app.use(express.json())

// app.use('/api/auth',require('./routes/api/auth'))  -- points to the relevant api

app.listen(8000,()=>console.log('Server Started'))