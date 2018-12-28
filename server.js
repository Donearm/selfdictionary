const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const validator = require("validator");
const assert = require("assert");

// Load config
const config = require('./config');
// Load database logic
const db = require('./db');

// Establish a mongodb connection using settings from the config.js file
const dburl = `mongodb://${config.db.host}/${config.db.name}`;

app.listen(8888, function() {
	console.log("Listening on http://localhost:8888");
});

app.all('/', function(req, res) {
	res.sendFile(__dirname + "/index.html")
});

// Serve static assets
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/img', express.static('img'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true,
}));
app.use(express.json());

app.post("/lookup", function(req, res) {
	const term = req.body.term;
	if (!validator.isLength(term, { min: 2 })) {
		res.status(400);
		return res.send({ "error": "Word to look up should be at least 2 characters long" });
	} else if (!validator.isAlpha(term)) {
		res.status(400);
		return res.send({ "error": "Only alphanumeric characters are accepted" });
	} else {
		db.searchForWord(dburl, "Deutsch", term, function(err, data) {
			if (err) {
				console.log(err);
				return res.send({ "error": err });
			} else {
				console.log(data);
				res.setHeader("Content-Type", "text/plain");
				res.send(data);
				return res.end();
			}
		});
	}
});
