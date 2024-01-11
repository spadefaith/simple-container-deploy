'use strict';

import AppModel from "./AppModel";
import CategoryModel from "./CategoryModel";
import EnvModel from "./EnvModel";
import PermissionModel from "./PermissionModel";
import RoleModel from "./RoleModel";
import RolePermissionModel from "./RolePermissionModel";
import UserModel from "./UserModel";


const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];


const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Models: any= {};



Models.EnvModel = EnvModel(sequelize, Sequelize.DataTypes);
Models.AppModel = AppModel(sequelize, Sequelize.DataTypes);
Models.CategoryModel = CategoryModel(sequelize, Sequelize.DataTypes);
Models.UserModel = UserModel(sequelize, Sequelize.DataTypes);
Models.RoleModel = RoleModel(sequelize, Sequelize.DataTypes);
Models.PermissionModel = PermissionModel(sequelize, Sequelize.DataTypes);
Models.RolePermissionModel = RolePermissionModel(sequelize, Sequelize.DataTypes);


Object.keys(Models).forEach(modelName => {
  if (Models[modelName].associate) {
    Models[modelName].associate(Models);
  }
});



Models.sequelize = sequelize;
Models.Sequelize = Sequelize;


// sequelize.sync({ force: true });

export default Models;
