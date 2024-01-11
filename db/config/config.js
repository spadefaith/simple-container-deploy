const path = require("path");

module.exports = {
  development: {
    username: "root",
    password: "root",
    storage: path.join(__dirname, "../../../apps", "db.sqlite"),
    host: "localhost",
    dialect: "sqlite",
    logging: console.log,
  },
  staging: {
    username: "root",
    password: "root",
    storage: path.join(__dirname, "../../../apps", "db.sqlite"),
    host: "localhost",
    dialect: "sqlite",
    logging: console.log,
  },
  production: {
    username: "root",
    password: "root",
    storage: path.join(__dirname, "../../../apps", "db.sqlite"),
    host: "localhost",
    dialect: "sqlite",
    logging: console.log,
  },
};
