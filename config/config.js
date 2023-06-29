
require("dotenv").config();
module.exports = {
  development: {
    username: "postgres",
    password: "",
    database: "myDb",
    host: "127.0.0.1",
    dialect: "postgres",
    secrets: {
      session: "dsdf",
    },
  },
  test: {
    username: "postgres",
    password: "",
    database: "myDb",
    host: "127.0.0.1",

    dialect: "postgres",
    secrets: {
      session: "dsdf",
    },
  },
  production: {
    username: "",
    password:
      "",
    database: "",
    host: "",
    port: 5432,
    dialect: "",
    dialectOptions: {
      "ssl": {
        "rejectUnauthorized": false
      }
    },
    secrets: {
      session: "dsdf",
    },
  },
};
