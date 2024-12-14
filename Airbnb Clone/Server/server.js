const express = require('express');

const app = express();

const path = require('path');

const ENV_VARS = require('./config/envVars');

const db = require('./Config/db');

const port = ENV_VARS.PORT;

const cors = require('cors');

app.use(cors());

app.use(express.json());

const cp = require('cookie-parser');

app.use(cp());

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'user_assets')));
app.use(express.urlencoded());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/v1', require('./routes'));

app.listen(port, (e)=>{
    if(e){
        console.log('server is not runing');
    }
    console.log('server is running on port:',port);
})