import express from 'express'
import multer from 'multer'
import path from 'path'

var ffmpeg = require('fluent-ffmpeg')
var exec	= require('child_process').exec
var os = require('os')

import authMiddleware from '../middlewares/authMiddleware';

var Upload = require('../model/upload')

var storage = multer.diskStorage({
	destination: function (request, file, callback) {
		callback(null, 'lib/uploads');
	},
	filename: function (request, file, callback) {
		callback(null, Date.now() + 'O.mp4')
	}
})

var upload = multer({
				storage: storage,
					fileFilter: function (req, file, callback) {
						if (file.mimetype == 'video/mp4') {   
				        	callback(null, true)
				    	}
				    
					},
				}).single('video')


let router = express.Router()

router.post('/', authMiddleware , (req, res) => {
	
	upload(req, res, function (err) {
	    if (err) {
	      	res.status(400).json(err)
	    }

	    var filepath = path.join(__dirname, '../../lib/uploads/'+ req.file.filename )
	    var proc = ffmpeg( filepath)
			    .screenshots({
			    	timestamps: [30.5, '50%', '01:10.123'],
			    	filename: req.file.filename + '-thumbnail.png',
			    	folder: path.join(__dirname, '../../lib/uploads/thumbs'),
			    	size: '50%'
			    }).on('end', ()=> {

				    var collection = new Upload({ 
					    thumbs: req.file.filename + '-thumbnail_1.png',
					    destination: req.file.destination,
					    encoding: req.file.encoding,
					    filename: req.file.filename,
					    mimetype: req.file.mimetype,
					    originalname: req.file.originalname,
					    path: req.file.path,
					    size: req.file.size,
					    meta: {
					    	userId: req.currentUser._id,
					    	posted: false,
					    	title: req.body.title,
					    	description: req.body.description
					    }
					})

					// Add Watermark Native code ffmpeg with child_process exec
					var savepath = path.join(__dirname, '../../lib/uploads/watermark/'+ req.file.filename )
					var watermark = path.join(__dirname, '../../public/watermark.png')
					
					exec( `ffmpeg -i ${filepath} -i ${watermark} -filter_complex overlay ${savepath}` , (error, stdout, stderr) => {
						if (error) {
					    	console.log(`exec error: ${error}`);
					    	return;
					  	}else{
					  		
					  	}
					})
					//end watermark


					collection.save(function(err) {
					    if (err) throw err
					    	res.send(collection)
					    
					})

				})
	})
})

router.get('/:increment', authMiddleware, (req, res) => {
	
  	Upload.find({ "meta.userId": req.currentUser._id }).skip(6 * req.params.increment).sort({createdAt: -1}).limit(6).exec( (err, result) => {
        if (err) throw err
        
        res.json({ success: true , result: result })
    })


})


export default router