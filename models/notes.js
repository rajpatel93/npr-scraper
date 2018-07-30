
// dependency
var mongoose = require('mongoose');

// creates Schema class
var Schema = mongoose.Schema;

// creates Comments schema
var NotesSchema = new Schema({
	title: {
	    type: String
	},
	body: {
	    type: String
	}
});

// creates Comments model
var Notes = mongoose.model("Notes", NotesSchema);

// exports Comments model
module.exports = Notes;


