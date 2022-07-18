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

let delayInMilliseconds = 20 * 1000; // 20 seconds

app.get(
	'/now',
	(req, _res, next) => {
		req.time = new Date().toString();
		next();
	},
	(req, res) => {
		setTimeout(() => {
			res.json({ time: req.time });
		}, delayInMilliseconds);
	}
);

app.use('/json', (_req, res) => {
	let message =
		process.env.MESSAGE_STYLE === 'uppercase' ? 'HELLO JSON' : 'Hello json';
	res.json({ message: message });
});

module.exports = app;
