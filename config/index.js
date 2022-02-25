const env = process.env.NODE_ENV || "development";
var config = require("./config");
module.exports = config[env];
