var mongoose = require('mongoose')
var Schema = mongoose.Schema
var timestamps = require('mongoose-timestamp')

var uploadScheme = new Schema({ 
	thumbs: String,
    destination: String, 
    encoding: String,
    filename: String,
    mimetype: String,
    originalname: String,
    path: String,
    size: String,
    meta: {
    	userId: String,
    	posted: String,
    	title: String,
    	description: String,
    }
});
uploadScheme.plugin(timestamps)

module.exports = mongoose.model('upload', uploadScheme)