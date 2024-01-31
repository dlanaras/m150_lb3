const express = require('express');
const app = express();
const port = 3000;
const hostname = '127.0.0.1';
const fs = require('fs');
const bodyParser = require('body-parser');
/*const cors = function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
};*/

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: false}));
//app.use(cors);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/passwords.html');
});

app.get('/static/index.html', (req, res) => {
    res.sendFile(__dirname + "/static/index.html");
})

app.get('/static/styles.css', (req, res) => {
    res.sendFile(__dirname + "/static/styles.css");
})

app.get('/static/script.js', (req, res) => {
    res.sendFile(__dirname + "/static/script.js");
})

app.get('/static/passwords.json', (req, res) => {
    res.sendFile(__dirname + "/static/passwords.json");
})

app.post('/', (req, res) => {
    let passwords = require(__dirname + '/static/passwords.json');
    passwords.push({name: req.body.name, password: req.body.password});
    fs.writeFileSync(__dirname + '/static/passwords.json', JSON.stringify(passwords));
    res.redirect('/');
});

app.delete('/', (req, res) => {
    if(!req.query || !req.query.id) {
        res.status(400);
        return;
    }
    let passwords = require(__dirname + '/static/passwords.json');
    passwords.splice(passwords.findIndex(item => item.name === req.query.id), 1);
    fs.writeFileSync(__dirname + '/static/passwords.json', JSON.stringify(passwords));
    res.sendStatus(204);
});

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`);
});