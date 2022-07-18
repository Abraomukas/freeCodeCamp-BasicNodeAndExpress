let express = require('express');
let app = express();

console.log('Hello World');

let indexPath = __dirname + '/views/index.html';
let publicPath = __dirname + '/public';

app.use('/public', express.static(publicPath));

app.get('/', (_req, res) => {
	res.sendFile(indexPath);
});

app.use('/json', (req, res) => {
	res.json({ message: 'Hello json' });
	res.redirect(301, req.url + '/json');
});

module.exports = app;
