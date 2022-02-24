const env = process.env.NODE_ENV || "development";
var config = require("./config.json");
module.exports = config[env];
