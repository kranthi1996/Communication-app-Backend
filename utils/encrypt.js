const crypto = require("crypto");
const algorithm = "aes256";
const key = "ExchangePasswordPasswordExchange";
const iv = crypto.randomBytes(8).toString("hex");

const cipher = crypto.createCipheriv(algorithm, key, iv);
const decipher = crypto.createDecipheriv(algorithm, key, iv);

function encrypt(text) {
   let encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
  return encrypted;
}
function decrypt(encrypted) {
  const decrypted =
    decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
  return decrypted;
}

module.exports ={encrypt, decrypt}