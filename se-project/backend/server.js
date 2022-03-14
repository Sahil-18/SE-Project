require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser : true });
const db = mongoose.connection;
db.on('error',(error)=>console.error(error));
db.once('open',()=>console.log('Connected to Database'));

const Login_router = require("./routes/Login.js");

app.use("/api",Login_router);

app.listen(PORT,()=>console.log('Server Started'));