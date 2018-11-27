const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient

const config = require('./config');

// Establish a mongodb connection using settings from the config.js file
const dburl = `mongodb://${config.db.host}/${config.db.name}`;

MongoClient.connect(dburl, {useNewUrlParser: true})
	.then((db) => {
		console.log("Connected to db!");
	})
	.catch((err) => {
		throw err;
	});

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
	res.send({message: "You were looking on the dictionary"});
});

