"use strict";

module.exports = function (app) {
  app.use("/contracts", require("../modules/user"));
  app.use("/jobs", require("../modules/task"));
  app.use("/event", require("../modules/event"));
};
