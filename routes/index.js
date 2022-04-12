"use strict";

module.exports = function (app) {
  app.use("/user", require("../modules/user"));
  app.use("/task", require("../modules/task"));
};
