'use strict';

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const compose = require('composable-middleware');
const config = require('../config');
const validateJwt = expressJwt({ secret: config.secrets.session , algorithms: ['HS256']});

/**
 * Attach the user object to the request if authenticated
 * Otherwise returns 403
 */
exports.isAuthenticated = function () {

  return compose()
    .use(validateJwt)
    .use(function (req, res, next) {
      next();
    });
};


/**
 * Returns a jwt token, signed by the app secret
 */
exports.signToken = function (obj) {

  return jwt.sign(
    obj,
    config.secrets.session,
    { expiresIn: 60 * 60 * 5 }
  );
};

exports.validate = function(token){
    try{
        var decoded = jwt.verify(token,config.secrets.session)
        return decoded;
    }
    catch(e){
        return null;
    }
};