const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const FileSystem = require("fs");
const port = 3000;
var data = require('./data.json');

app.use(express.json())

app.use(cors({
    origin: '*', // Replace with the origin(s) that should be allowed to access your API
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type',
  }));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/caisse', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/caisse.html'));
})

app.get('/borne', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/borne.html'));
})

app.get('/borne/:id', (req, res) => {
    let index = req.params.id;
    res.json({data:data.bornes[index-1]});
})

app.post('/code', (req, res) => {
    const body = req.body;
    let code = Math.floor(Math.random() * 10000);
    data.commandes.push({carburant:body['carburant'], code:code, qte: body.qte});
    writeInJSON();
    res.json({code:code});
})

app.post('/commande', (req, res) => {
    const body = req.body;
    let index = -1;
    for (let i = 0; i < data.commandes.length; i++) {
        if (data.commandes[i].code == body.code) {
            index = i;
            break;
        }
    }

    if (index == -1) {
        res.status(400).send('Code invalide');
    } else if (!data.bornes[body.born - 1].includes(data.commandes[index].carburant)) {
        res.status(400).send('Carburant indisponible dans la borne');
    } else if (body.qte >= data.commandes[index].qte) {
        let qte = data.commandes[index].qte;
        data.commandes.pop(index);
        res.send('Les ' + qte + 'L restant on été prélevé. Code detruit');
    } else {
        data.commandes[index].qte -= body.qte;
        res.send('Plein fait. Il reste ' + data.commandes[index].qte + ' sur ce code');
    }
    writeInJSON();
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

function writeInJSON() {
    FileSystem.writeFile('data.json', JSON.stringify(data), (error) => {
        if (error) throw error;
    });
}