const express = require('express');
const cookie = require('cookie-parser');
const connect = require('./config/connectdb');
const dotenv = require('dotenv').config();
const app = express();

connect();

app.use(cookie());
app.use(express.static('public'));
app.use(express.urlencoded({urlencoded:true}))
app.use(express.json());
app.set('view engine','ejs');

app.use('/',require('./routes/auth'));
app.use('/dashboard',require('./routes/dashboard'));



app.use((err,req,res,next)=>{
    res.send(err.message);
})


app.listen(process.env.PORT || 3000,()=>{
    console.log("app listening")
})