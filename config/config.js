
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
    },
  },
  test: {
    username: "postgres",
    password: "Kranthi@1996",
    database: "myDb",
    host: "127.0.0.1",

    dialect: "postgres",
    secrets: {
      session: "dsdf",
    },
  },
  production: {
    username: "kvfldwtszacuqs",
    password:
      "734d7559606aec93a2544d96affaa69a2f52812fef1450519e7ebd5a43aac746",
    database: "daifk7hnm73snj",
    host: "ec2-63-32-248-14.eu-west-1.compute.amazonaws.com",
    port: 5432,
    dialect: "postgres",
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
