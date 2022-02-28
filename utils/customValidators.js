module.exports.email = function (email) {
  const re = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  return re.test(email);
};

module.exports.mobile = function (mobile) {
  const re = new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/);
  return re.test(mobile);
};
