const express = require('express');
const app = express();
const port = 3000;
const hostname = '127.0.0.1';
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/passwords.html');
});

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