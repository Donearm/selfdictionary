const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const validator = require("validator");
const assert = require("assert");
const mongo = require('mongodb');

const MongoClient = require("mongodb").MongoClient;

const config = require('./config');

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

app.post("/lookup", function(req, res) {
	const term = req.body.term; 
	if (!validator.isLength(term, { min: 2 })) {
		res.status(400);
		return res.send("Word to look up should be at least 2 characters long");
	} else if (!validator.isAlpha(term)) {
		res.status(400);
		return res.send("Only alphanumeric characters are accepted");
	} else {
		MongoClient.connect(dburl, { useNewUrlParser: true }, function(err, client) {
			if (err) return console.error(err);

			console.log("Connection to DB done");
			db = client.db("dictionary");
			db.collection("Deutsch").find({'Word': term}).toArray(function(err, docs) {
				assert.equal(err, null);
				console.log("Found the following results: ");
				console.log(docs);
				res.setHeader("Content-Type", "text/plain");
				res.send(docs);
				res.end();
			});
		});
	}
});
