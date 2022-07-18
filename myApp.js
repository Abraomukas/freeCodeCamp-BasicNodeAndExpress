let express = require('express');
let app = express();

console.log('Hello World');

let indexPath = __dirname + '/views/index.html';
let publicPath = __dirname + '/public';

app.use(express.static(publicPath));

app.get('/', (_req, res) => {
	res.sendFile(indexPath);
});

module.exports = app;
