const express = require('express')
const path = require('path')
const cors = require('cors');
const app = express()
const port = 3000
var db = []

//const carburant = ['Gazoil', 'SP95', 'SP98']
const born = [['Gazoil', 'SP95', 'SP98'], ['Gazoil'], ['SP95', 'SP98']]

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
    db.push({carburant:body['carburant'], code:code, qte: body.qte})
    res.json({code:code})
})

app.post('/commande', (req, res) => {
    const body = req.body
    let index = -1
    for (let i = 0; i < db.length; i++) {
        if (db[i].code == body.code) {
            index = i;
            break;
        }
    }
    if (index == -1) {
        res.status(400).send('Code invalide')
        return
    }

    if (!born[body.born - 1].includes(db[index].carburant)) {
        res.status(400).send('Carburant indisponible dans la borne')
        return
    }

    if (body.qte >= db[index].qte) {
        db.pop(index)
        res.send('Les ' + db[index].qte + 'L restant on été prélevé. Code detruit')
        return
    }

    db[index].qte -= body.qte
    res.send('Plein fait. Il reste ' + db[index].qte + ' sur ce code')
    return
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})