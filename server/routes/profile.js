import express from 'express'
import multer from 'multer'
import path from 'path'
import jwt from 'jsonwebtoken'

var config = require('../config')

var ffmpeg = require('fluent-ffmpeg')
var exec	= require('child_process').exec
var os = require('os')

import authMiddleware from '../middlewares/authMiddleware';

var Upload = require('../model/upload')
var Users = require('../model/users')

var storage = multer.diskStorage({
	destination: function (request, file, callback) {
		callback(null, 'lib/uploads/profileImage');
	},
	filename: function (request, file, callback) {
		callback(null, Date.now() + 'O.jpg')
	}
})

var upload = multer({
				storage: storage,
					fileFilter: function (req, file, callback) {
						console.log( file )
						if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {   
				        	callback(null, true)
				    	}
				    
					},
				}).single('image')


let router = express.Router()

router.post('/', authMiddleware , (req, res) => {
	
	upload(req, res, function (err) {
	    if (err) {
	      	res.status(400).json(err)
	    }

	 
	  	Users.findOne(req.currentUser._id , function (err, user) {
		    user.img = req.file.filename

		    user.save(function (err) {
		        if(err) {
		            res.status(401).json({ success: false, message: 'Theres something wrong on updating.' });
		        }else{
		        	
		        	const token = jwt.sign({
			          	id: user._id,
			          	username: user.name,
			          	img: user.img
			        }, config.secret)
			        res.json({ success: true, message: 'Authentication Success.' , token: token })

		        }
		    });
		});


	})
})


export default router