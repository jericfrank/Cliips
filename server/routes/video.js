import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

var config = require('../config')
var Upload = require('../model/upload')
var Users = require('../model/users')

let router = express.Router()

router.get('/:id', (req, res) => {
	

    Upload.findOne({_id: req.params.id }, function(err, result) {
	    if (err) throw err

	    	Users.findOne({ _id: result.meta.userId }, function(err, user) {

	    		if (err) throw err;
	    		res.json({ success: true , result: result , user: user })
	  		})


	    
	})



})

export default router