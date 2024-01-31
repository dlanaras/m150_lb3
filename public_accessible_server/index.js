
const express = require('express');
const app = express();
const port = 8443;
const hostname = '192.168.1.163';
const escape = require('escape-html');

app.use(express.static(__dirname + '/static'));

app.get(/\/(.*)/, (req, res) => {
  const url = req.query.url;
  if(!url) {
    res.send(getHtml());
    return;
  }
  const start = Date.now();
  fetch(decodeURIComponent(url)).then(result => result.text()).then(data => {
    const timeSpent = (Date.now() - start);
    res.send(getHtml(createResults(timeSpent, data)));
  }, (err) => {
    console.error(err);
    res.send(getHtml('<h3 class="error">The entered domain responded with an error response. Make sure the domain is written correctly and that your webserver is running</h3>'));
  });
});

app.listen(port, hostname, () => {
  console.log(`Example app listening on ${hostname}:${port}`);
});

getHtml = (results) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Website Speed Test</title>
    <script src="script.js"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Test your Website speed!</h1>
    <form method='get'>
      <label><h2>Enter your Website-URL</h2></label>
      <input type="url" name="url" id="url" placeholder="https://example.com">
      <input type="submit">
    </form>
    <div id="results">
        ${results ?? '<!--Results will be shown here-->'}
    </div>
</body>
</html>
`

function createResults(timeSpent, response) {
  return `
  <h2>Your Website took ${timeSpent} ms to load</h2>
  <h3>${timeSpent > 500 ? '<span class="slow">You should optimize your website</span>' : '<span class="fast">Your Website loads really fast</span>'}</h3>
  <h3>Your website Responded:</h3>
  <iframe srcdoc="${escape(response)}"></iframe>
  `
}