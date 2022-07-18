let express = require('express');
let app = express();

console.log('Hello World');

let absolutePath = __dirname + './views/index.html';

app.get('/', (_req, res) => {
	res.sendFile(absolutePath);
});

module.exports = app;
