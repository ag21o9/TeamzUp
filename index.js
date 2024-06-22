const express = require('express');
const cookie = require('cookie-parser');
const app = express();

app.use(cookie());
app.use(express.static('public'));
app.use(express.json());
app.set('view engine','ejs');




app.use((err,req,res,next)=>{
    res.send(err.message);
})
