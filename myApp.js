require('dotenv').config();

let bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.use((req, _res, next) => {
	console.log(req.method.toUpperCase() + ' ' + req.path + ' - ' + req.ip);
	next();
});

app.use(bodyParser.urlencoded({ extended: false }));

console.log('Hello World');

let indexPath = __dirname + '/views/index.html';
let publicPath = __dirname + '/public';

app.use('/public', express.static(publicPath));

app.get('/', (_req, res) => {
	res.sendFile(indexPath);
});

app.get(
	'/now',
	(req, _res, next) => {
		req.time = new Date().toString();
		next();
	},
	(req, res) => {
		res.json({ time: req.time });
	}
);

app.get('/:word/echo', (req, res) => {
	let word = req.params.word;

	res.json({ echo: word });
});

app.use('/json', (_req, res) => {
	let message =
		process.env.MESSAGE_STYLE === 'uppercase' ? 'HELLO JSON' : 'Hello json';
	res.json({ message: message });
});

app.route('/name').get((req, res) => {
	let firstName = req.query.first;
	let lastName = req.query.last;

	res.json({ name: firstName + ' ' + lastName });
});

module.exports = app;
