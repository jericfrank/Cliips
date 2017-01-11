import express from 'express'
import path from 'path'

import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config.dev'

import bodyParser from 'body-parser'

import bcrypt from 'bcryptjs'

import latest from './routes/latest'
import auth from './routes/auth'
import upload from './routes/upload'
import profile from './routes/profile'
import video from './routes/video'

import _ from "lodash"

var mongoose = require('mongoose')
var config = require('./config')

let app = express()

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}))
app.use(webpackHotMiddleware(compiler))

app.use(bodyParser.json())

app.use('/api/latest', latest)
app.use('/api/auth', auth)
app.use('/api/upload', upload)
app.use('/api/profile', profile)
app.use('/api/video', video)

app.get('/about', (req, res) =>{
	res.sendFile( path.join(__dirname, '../client/about.html') )
})

app.use('/cdn/thumb', express.static(path.join(__dirname, '../lib/uploads/thumbs')))
app.use('/cdn/video', express.static(path.join(__dirname, '../lib/uploads')))
app.use('/cdn/image', express.static(path.join(__dirname, '../lib/uploads/profileImage')))

app.use(express.static(path.join(__dirname, '../public')))


app.get('/*', (req, res) =>{
	res.sendFile( path.join(__dirname, '../client/index.html') )
})


mongoose.Promise = global.Promise
mongoose.connect(config.database, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo. ', err)
    process.exit(1)
  } else {
    var server = app.listen(3000, function () {


        var Users = require('./model/users')

          Users.find({name: 'Guns'}, (err, result) => {
            if (err) {
              throw err
            }
              
                if(_.isEmpty(result)) 
                {
                  var User = new Users({ 
                        name: 'Guns',
                        password: bcrypt.hashSync("password")
                      });

                      User.save(function(err) {
                          if (err) throw err
                      })
                }
                  
            })



  	  	var host = server.address().address
  	  	var port = server.address().port

  	  	console.log( server.address() )
  	  	console.log("Server listening at http://%s:%s", host, port)

  	})
  }
})