const express = require('express')
const path = require('path');
const app = express()
const port = 3000
const fs = require('fs');

const borne = fs.readFileSync( __dirname + '/main.html' );

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/caisse', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/caisse.html'));
})

app.get('/borne1', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/borne1.html'));
})

app.get('/borne2', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/borne2.html'));
})

app.get('/borne3', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/borne3.html'));
})

/*app.post('/', (req, res) => {
    res.send('Got a POST request')
})

app.post('/', (req, res) => {
    res.send('Got a POST request')
})*/

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})