const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const assert = require("assert");
const mongo = require('mongodb');

const MongoClient = require("mongodb").MongoClient;

const config = require('./config');

// Establish a mongodb connection using settings from the config.js file
const dburl = `mongodb://${config.db.host}/${config.db.name}`;

app.listen(8888, function() {
	console.log("Listening on http://localhost:8888");
});

app.get('/', function(req, res) {
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
	res.send(req.body.term);
	MongoClient.connect(dburl, { useNewUrlParser: true }, function(err, client) {
		if (err) return console.error(err);

		console.log("Connection to DB done");
		db = client.db("dictionary");
		db.collection("Deutsch").find({'Word': req.body.term}).toArray(function(err, docs) {
			assert.equal(err, null);
			console.log("Found the following results: ");
			console.log(docs);
			res.write(docs);
			res.end();
			cb(docs);
		});
	});
});
