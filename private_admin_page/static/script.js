function getPasswordHtml(name, password) {
    return `
    <div>
        <h2 class="name">${name}:</h2>
        <h2 class="password">${password}</h2>
        <button onclick="deletePassword('${name}')">Delete</button>
    </div>
    `
}

function deletePassword(name) {
    fetch(`?id=${name}`, {method: 'DELETE'}).then(() => {
        console.log('deleted password: ' + name);
        location.reload();
    });
}

function initPasswords(selector) {
    fetch('./passwords.json')
    .then((response) => response.json())
    .then((passwords) => {
        let html = "";
        passwords.forEach(passObj => {
            html += getPasswordHtml(passObj.name, passObj.password)
        });

        document.querySelector(selector).innerHTML = html;
    });
}