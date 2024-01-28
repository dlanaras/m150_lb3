
const express = require('express');
const app = express();
const port = 8443;
const hostname = '192.168.1.163';

app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

app.listen(port, hostname, () => {
  console.log(`Example app listening on ${hostname}:${port}`);
});
