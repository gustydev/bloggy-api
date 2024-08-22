require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hi there :)')
})

app.listen(process.env.PORT, () => {console.log(`App listening on port ${process.env.PORT}`)})