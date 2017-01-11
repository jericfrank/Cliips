import jwt from 'jsonwebtoken'
import config from '../config'

var Users = require('../model/users')

export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {

        //  req._id = decoded.id
        // next() mas pas2x kaysa cgeg tag query
        Users.findOne({
                _id: decoded.id
            }, function(err, user) {
                if (!user) {
                res.status(404).json({ error: 'No such user' });
              } else {
                req.currentUser = user
                next()
              }

          })
        
      }
    });

  } else {
    res.status(403).json({
      error: 'Need to login first!'
    })
  }
}
