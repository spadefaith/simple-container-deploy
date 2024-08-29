require("dotenv").config({});
const path = require("path");
const root = process.env.PWD;
module.exports = {
  development: {
    username: "root",
    password: "root",
    storage: path.join(root, "../apps", "db.sqlite"),
    host: "localhost",
    dialect: "sqlite",
    logging: console.log,
  },
  staging: {
    username: "root",
    password: "root",
    storage: path.join(root, "../apps", "db.sqlite"),
    host: "localhost",
    dialect: "sqlite",
    logging: console.log,
  },
  production: {
    username: "root",
    password: "root",
    storage: path.join(root, "../apps", "db.sqlite"),
    host: "localhost",
    dialect: "sqlite",
    logging: console.log,
  },
};
