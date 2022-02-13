require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./routes/routes')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(bodyParser.json())
app.use('/', routes)

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@bookdirectory.rvkqd.mongodb.net/library?retryWrites=true&w=majority`)
    .then(() => {
        console.log(`Connected to MongoDB!!`)
        app.listen(process.env.PORT);
    })
    .catch(err => console.log(err));