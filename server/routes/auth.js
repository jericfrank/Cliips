import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

var config = require('../config')
var Users = require('../model/users')

let router = express.Router()

router.post('/login', (req, res) => {

	Users.findOne({ $or:[ {name:req.body.name}, {email:req.body.name} ]}, function(err, user) {

	    	if (err) throw err;

	    	if (!user) {
	      		res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
	    	}else{
	    		if(bcrypt.compareSync( req.body.password , user.password)) {
	    			const token = jwt.sign({
			          id: user._id,
			          username: user.name,
			          img: user.img
			        }, config.secret)

	    			res.json({ success: true, message: 'Authentication Success.' , token: token });
	    		}else{
	    			res.status(401).json({ success: false, message: 'Authentication failed. Wrong Combination.' });
	    		}

	    	}
	  })

})

router.post('/register', (req, res) => {

	var User = new Users({ 
		name: req.body.name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password),
		img: null
	});

	User.save(function(err, user) {
		if (err) throw err

		const token = jwt.sign({
			id: user._id,
			username: user.name,
			img: user.img
		}, config.secret)

		res.json({ success: true, message: 'Auto Authentication.' , token: token });
	})

	
})


export default router