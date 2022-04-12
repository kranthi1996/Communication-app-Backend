const { check } = require("express-validator");
function validator(type) {
  switch (type) {
    case "mobile_auth": {
      return [
        check("mobile_number", "Mobile number doesn't exists").exists(),
        check("mobile_number", "Mobile number should be 10 digits").isLength(
          10
        ),
        check("country_code", "Country code doesn't exists").exists(),
      ];
    }
    case "verify_otp": {
      return [
        check("mobile_number", "Mobile number doesn't exists").exists(),
        check("mobile_number", "Mobile number shoule be 10 digits").isLength(
          10
        ),
        check("country_code", "Country code doesn't exists").exists(),
        check("otp_details", "Otp details doesn't exists")
          .exists()
          .bail()
          .isObject(),
      ];
    }
    case "user_register": {
      return [
        check("name", "Name doesn't exists.").exists(),
        check("email", "Email doesn't exists.").exists().isEmail(),
        check("password", "Password doesn't exists.").exists(),
      ];
    }
  }
}
module.exports = { validator };
