import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

var config = require('../config')
var Upload = require('../model/upload')

let router = express.Router()

router.get('/:increment', (req, res) => {
	
	Upload.find({}).skip(6 * req.params.increment).sort({createdAt: -1}).limit(6).exec( (err, result) => {
        if (err) throw err
        
        res.json({ success: true , result: result })
    })

})



export default router