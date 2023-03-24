const express = require('express')
const path = require('path')
const app = express()
const port = 3000
var db = []

console.log(db)

//const carburant = ['Gazoil', 'SP95', 'SP98']
const born = [['Gazoil', 'SP95', 'SP98'], ['Gazoil'], ['SP95', 'SP98']]

app.use(express.json())

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/caisse', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/caisse.html'));
})

app.get('/borne/:id', (req, res) => {
    let index = req.params.id
    res.json({data:born[index-1]})
})

app.get('/borne', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/borne.html'));
})

app.post('/code', (req, res) => {
    const body = req.body
    let code = Math.floor(Math.random() * 10000)
    db.push({typeCarburant:body.carburant, code:code, qte: body.qte})
    res.send({code:code})
})

app.post('/commande', (req, res) => {
    const body = req.body
    let index = -1
    for (let i = 0; i < data.length; i++) {
        if (data.code == body.code) {
            index = i;
            break;
        }
    }
    if (index == -1) {
        res.status(400).send("Code invalide")
    }

    if (!born[body.born].includes(data[index].carburant)) {
        res.status(400).send("Carburant indisponible dans la borne")
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})