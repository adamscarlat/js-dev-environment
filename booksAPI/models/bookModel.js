var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//represents a model for a book 
var bookModel = new Schema({
    title: {type: String},
    author: {type: String},
    genre: {type: String},
    read: {type: Boolean, default: false}
});

//add the mongo model to mongoose and export it 
module.exports = mongoose.model('Book', bookModel);