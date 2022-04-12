require("dotenv").config();
module.exports = {
  development: {
    username: "postgres",
    password: "Kranthi@1996",
    database: "myDb",
    host: "127.0.0.1",
    dialect: "postgres",
    secrets: {
      session: "dsdf",
    }
  },
  test: {
    username: "postgres",
    password: "Kranthi@1996",
    database: "myDb",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    secrets: {
      session: "dsdf",
    },
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
