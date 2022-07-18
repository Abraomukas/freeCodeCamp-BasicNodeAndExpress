require('dotenv').config();

let express = require('express');
let app = express();

app.use((req, _res, next) => {
	console.log(req.method.toUpperCase() + ' ' + req.path + ' - ' + req.ip);
	next();
});

console.log('Hello World');

let indexPath = __dirname + '/views/index.html';
let publicPath = __dirname + '/public';

app.use('/public', express.static(publicPath));

app.get('/', (_req, res) => {
	res.sendFile(indexPath);
});

app.get(
	'/now',
	(_req, _res, next) => {
		next();
	},
	(req, res) => {
		res.json({ time: req.time });
	}
);

app.use('/json', (_req, res) => {
	let message =
		process.env.MESSAGE_STYLE === 'uppercase' ? 'HELLO JSON' : 'Hello json';
	res.json({ message: message });
});

module.exports = app;
