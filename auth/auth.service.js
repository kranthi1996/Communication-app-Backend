"use strict";

const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const compose = require("composable-middleware");
const config = require("../config/index");
const errorHandler = require("../utils/errorHandler");

const validateJwt = expressJwt({
  secret: config.secrets.session,
  algorithms: ["HS256"],
});

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
  return jwt.sign(obj, config.secrets.session, { expiresIn: 60 * 60 * 24 });
};

exports.validateToken = function (req, res, next) {
  try {
    const token =
      req.body.token || req.query.token || req.headers.authorization;
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.secrets.session, function (err, decoded) {
        if (err) {
          const errorObj = {
            message: "Unauthorized token.",
            Error: err,
          };
          return errorHandler(req, res, errorObj, 401);
        }
        req.user = decoded;
        next();
      });
    } else {
      // if there is no token
      // return an error
      const errorObj = {
        message: "Token required.",
      };
      return errorHandler(req, res, errorObj, 403);
    }
  } catch (e) {
    const errorObj = {
      error: e,
    };
    return errorHandler(req, res, errorObj, 401);
  }
};
