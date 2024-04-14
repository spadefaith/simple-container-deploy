import Models from "./db/models";

Models.sequelize.sync({ force: true });
