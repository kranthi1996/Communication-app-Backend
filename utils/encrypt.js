const bcrypt = require('bcryptjs');

function encryptPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hash(password, salt)
  return hash; 
}
module.exports = encryptPassword ;