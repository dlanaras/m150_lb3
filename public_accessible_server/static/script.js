async function testWebsite() {
    const url = document.querySelector('#url').value;
    const start = Date.now();
    fetch(url).then((_) => {
        const timeSpent = (Date.now() - start);
        document.querySelector('#results').innerHTML = createResults(timeSpent);
    }, (_) => {
        fetch(url, {mode: 'no-cors'}).then((__) => {
            const timeSpent = (Date.now() - start);
            document.querySelector('#results').innerHTML = createResults(timeSpent);
        }, (err) => {
            console.error(err);
            document.querySelector('#results').innerHTML = '<h3 class="error">The entered domain responded with an error response. Make sure the domain is written correctly and that your webserver is running</h3>';
        })
    });
}

function createResults(timeSpent) {
    return `
    <h2>Your Website took ${timeSpent} ms to load</h2>
    <h3>${timeSpent > 500 ? '<span class="slow">You should optimize your website</span>' : '<span class="fast">Your Website loads really fast</span>'}</h3>
    `
}