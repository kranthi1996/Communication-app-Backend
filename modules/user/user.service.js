"use strict";
const { User, Otp } = require("../../models");
const userModel = User;
const OtpModel = Otp;
const errorHandler = require("../../utils/errorHandler");
const responseSender = require("../../utils/responseSender");
const authService = require("../../auth/auth.service");
const dates = require("../../utils/dates");
const encrypt = require("../../utils/encrypt");
const emailService = require("../../utils/emaiService");
const randomstring = require("randomstring");
const bcrypt = require("bcryptjs");

async function sendOtpToEmail(user_id, email) {
  const confirmationCode = randomstring.generate({
    length: 6,
    charset: "numeric",
  });
  emailService.sendMail(
    email,
    `heloo`,
    `<h2>Hello, </h2>
    <p>Please confirm your email by clicking on the following link</p>
    <a href=http://localhost:4200/confirm/${confirmationCode}> Click here</a>
    </div>`,
    function (err, response) {
      if (err) {
        return res.status(401).send(err);
      }
      const otp_obj = {
        user_id: user_id,
        otp: confirmationCode,
      };
      const otp = OtpModel.create(otp_obj);
      const details = {
        success: true,
        message: "Verification code has been sent to an email.",
        otp_id: otp.id,
      };
      return details;
    }
  );
}
async function findUser(email) {
  const userFound = await userModel.findOne({
    where: {
      email: email,
    },
  });

  if (userFound) {
    return userFound;
  } else {
    return false;
  }
}

/****************API FUNCTIONS ***************************/
async function userRegister(req, res) {
  try {
    const { name, email, password } = req.body;
    const userDetails = await findUser(email);
    if (userDetails) {
      return errorHandler(
        req,
        res,
        { message: "Email already existed." },
        409,
      );
    } else {
      const encrypted_password = await encrypt(password);

      const user = await userModel.create({
        first_name: name,
        email: email,
        password: encrypted_password,
      });
      if (user) {
        const details = await sendOtpToEmail(user.id, email);
        return responseSender(
          req,
          res,
          details,
          201,
          "Verification code has been sent to an email."
        );
      }
    }
  } catch (error) {
    const errObj = { errObj: error };
    return errorHandler(req, res, errObj, 500);
  }
}

async function verifyEmail(req, res) {
  try {
    const { confirmation_code } = req.params;
    if (confirmation_code) {
      const otp = await OtpModel.findOne({
        where: {
          otp: req.params.confirmation_code,
        },
      });
      if (!otp) {
        return res.status(404).send({ message: "User Not found." });
      } else {
        otp.verified = true;
        await otp.save();
      }
      return res.status(200).send({ message: "Email verified." });
    } else {
      const errObj = { errObj: "Verification code is not existed." };
      return errorHandler(req, res, errObj, 500);
    }
  } catch (error) {}
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await findUser(email);
    if (user) {
      var otp_details = await OtpModel.findOne({
        where: {
          user_id: user.dataValues.id,
        },
      });
    }
    if (!user) {
      const errObj = { message: "User not found." };
      return errorHandler(req, res, errObj, 404);
    } else if (otp_details.dataValues.verified !== true) {
      const errObj = { message: "Email not verified." };
      return errorHandler(req, res, errObj, 401);
    } else {
      try {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            return res.status(401).send({ message: err });
          }
          if (result) {
            // Send JWT
            let data = {
              user: user,
              token: authService.signToken({
                _id: user.id,
                email: user.email,
              }),
            };
            responseSender(req, res, data, 200, "Success");
          } else {
            // response is OutgoingMessage object that server response http request
            return res.status(401).json({
              success: false,
              message: "passwords do not match",
            });
          }
        });
      } catch (err) {
        const errObj = { details: "Bad Request" };
        return errorHandler(req, res, errObj, 401);
      }
    }
  } catch (error) {
    errorHandler(req, res, { msg: "Unknown error" }, 500);
  }
}
module.exports = { userRegister, verifyEmail, login };

// async function sendOtpToMobileNumber(user_id, country_code, mobile_number) {
//   /****Sms Gateway needs to be implemented****/

//   //Secs time for verification otp
//   const now = new Date();
//   const expiration_time = dates.addSecondsToDate(now, 300);
//   const otp_obj = {
//     user_id: user_id,
//     otp: 123456,
//     expiration_time: expiration_time,
//   };
//   const otp = await OtpModel.create(otp_obj);
//   if (otp) {
//     //Choose message template accordingily

//     const details = {
//       timestamp: now,
//       success: true,
//       message: "OTP sent to user.",
//       otp_id: otp.id,
//     };

//     // Encrypt the details object
//     //const encoded = await encrypt(JSON.stringify(details));
//     return details;
//   } else {
//     const errObj = {
//       details: "Failed to store otp",
//     };
//     errorHandler(req, res, errObj, 500);
//   }
// }
// async function create(req, res) {
//   try {
//     const { mobile_number, country_code } = req.body;
//     //checking mobile number existed, if not creating
//     const user = await findUser(mobile_number, country_code);
//     if (user) {
//       //SendVerficationCode, calling sms gateway
//       const details = await sendOtpToMobileNumber(
//         user.id,
//         user.country_code,
//         mobile_number
//       );
//       if (details) {
//         return responseSender(
//           req,
//           res,
//           { otp_details: details, user_details: user.dataValues },
//           200,
//           "Existed user."
//         );
//       }
//     } else {
//       const user = await userModel.create({
//         mobile_number: mobile_number,
//         country_code: country_code,
//       });
//       if (user) {
//         //SendVerficationCode, calling sms gateway
//         const details = await sendOtpToMobileNumber(
//           user.id,
//           country_code,
//           mobile_number
//         );
//         if (details) {
//           return responseSender(
//             req,
//             res,
//             { otp_details: details, user: user },
//             201,
//             "User created successfully, OTP sent to user."
//           );
//         }
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     const errObj = { msg: error };
//     return errorHandler(req, res, errObj, 500);
//   }
// }
// async function verifyOtp(req, res) {
//   try {
//     const { mobile_number, country_code, otp_details } = req.body;
//     const user = await findUser(mobile_number, country_code);
//     if (!user) {
//       const errObj = { message: "User not found." };
//       return errorHandler(req, res, errObj, 401);
//     } else {
//       try {
//         const otp_instance = await OtpModel.findOne({
//           where: { id: otp_details.otp_id },
//         });
//         //Check if OTP is available in the DB
//         if (otp_instance != null) {
//           //Check if OTP is equal to the OTP in the DB
//           if (otp_details.OTP === otp_instance.otp) {
//             //Check if OTP is already used or not
//             if (otp_instance.verified != true) {
//               //Check if OTP is expired or not
//               const currentdate = new Date();
//               if (
//                 dates.compare(otp_instance.expiration_time, currentdate) == 1
//               ) {
//                 // Mark OTP as verified or used
//                 otp_instance.verified = true;
//                 otp_instance.save();
//                 let data = {
//                   user: user,
//                   token: authService.signToken({
//                     _id: user.id,
//                     mobile_number: user.mobile_number,
//                   }),
//                 };
//                 responseSender(req, res, data, 200, "OTP Matched");
//               } else {
//                 const errObj = { message: "OTP Expired" };
//                 return errorHandler(req, res, errObj, 401);
//               }
//             } else {
//               const errObj = { message: "OTP Already Used" };
//               return errorHandler(req, res, errObj, 401);
//             }
//           } else {
//             const errObj = {
//               message: "OTP NOT Matched",
//             };
//             return errorHandler(req, res, errObj, 401);
//           }
//         } else {
//           const errObj = { message: "OTP record not found." };
//           return errorHandler(req, res, errObj, 401);
//         }
//       } catch (err) {
//         const errObj = { details: "Bad Request" };
//         return errorHandler(req, res, errObj, 401);
//       }
//     }
//   } catch (error) {
//     errorHandler(req, res, { msg: "Unknown error" }, 500);
//   }
// }
// async function details(req, res) {
//   try {
//     let userDetails = {};
//     const id = req.user._id;
//     if (req.body.name) {
//       userDetails.first_name = req.body.name;
//     }
//     if (req.body.email) {
//       userDetails.email = req.body.email;
//     }
//     if (req.body.gender) {
//       userDetails.gender = req.body.gender;
//     }
//     if (req.body.facebook) {
//       userDetails.facebook = req.body.facebook;
//     }
//     if (req.body.linkedin) {
//       userDetails.linkedin = req.body.linkedin;
//     }
//     if (req.body.instagram) {
//       userDetails.instagram = req.body.instagram;
//     }
//     const details = await userModel.update(userDetails, {
//       where: {
//         id: id,
//       },
//     });
//     if (details[0]) {
//       const user_details = await userModel.findOne({ where: { id: id } });
//       return responseSender(
//         req,
//         res,
//         { user: user_details },
//         200,
//         "User details saved."
//       );
//     } else {
//       return errorHandler(req, res, {}, 404, "No record modified.");
//     }
//   } catch (error) {
//     const errObj = { errObj: error };
//     return errorHandler(req, res, errObj, 500);
//   }
// }
