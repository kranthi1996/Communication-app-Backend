"use strict";
const { users } = require("../models");
const userModel = users;
const errorHandler = require("../utils/errorHandler");
const responseSender = require("../utils/responseSender");
const authService = require("../auth/auth.service");
async function findUser(mobile_number, country_code) {
  const userFound = await userModel.findOne({
    where: {
      mobile_number: mobile_number,
      country_code: country_code,
    },
  });
  if (userFound) {
    return userFound;
  } else {
    return false;
  }
}
async function create(req, res) {
  try {
    const { mobile_number, country_code } = req.body;
    //checking mobile number existed, if not creating
    const userFound = await findUser(mobile_number, country_code);
    if (userFound) {
      //SendVerficationCode, calling sms gateway
      return responseSender(
        req,
        res,
        userFound.dataValues,
        200,
        "Existed user deatils."
      );
    } else {
      const user = await userModel.create({
        mobile_number: mobile_number,
        country_code: country_code,
      });
      if (user) {
        return responseSender(
          req,
          res,
          user,
          201,
          "User created successfully."
        );
        //SendVerficationCode, calling sms gateway
      }
    }
  } catch (error) {
    errorHandler(req, res, { msg: "Unknown error" }, 500);
  }
}
async function verifyCode(req, res) {
  try {
    const { mobile_number, country_code, verification_code } = req.body;
    const user = await findUser(mobile_number, country_code);
    if (!user) {
      return errorHandler(req, res, { message: "User not found." }, 401);
    } else {
      //Here we verify the code of specific user, if code matchs we return the token
      if (verification_code === 123456) {
        let data = {
          user: user,
          token: authService.signToken({
            _id: user.id,
            mobile_number: user.mobile_number,
          }),
        };
        responseSender(req, res, data, 200, "token");
      } else {
        return errorHandler(
          req,
          res,
          { message: "Verification code is incorrect, please try again" },
          401
        );
      }
    }
  } catch (error) {
    errorHandler(req, res, { msg: "Unknown error" }, 500);
  }
}
module.exports = { create, verifyCode };
