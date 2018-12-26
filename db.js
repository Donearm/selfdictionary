const mongo = require('mongodb');
const MongoClient = require("mongodb").MongoClient;

let database = {};

database.searchForWord = function(dburl, coll, word, cb) {
	MongoClient.connect(dburl, { useNewUrlParser: true }, function(err, client) {
		if (err) return console.error(err);

		console.log("Connection to DB done");
		db = client.db("dictionary");

		db.collection(coll).find({'Word': word}).toArray(cb);
	});
}

module.exports = database;
