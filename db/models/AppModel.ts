export default function AppModel (Sequelize, DataTypes) {

  const entity = Sequelize.define(
    "apps",
    {
      app_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      webhook_url:{
        type: DataTypes.STRING(50),
      },
      compose_path:{
        type: DataTypes.STRING(50),
      },
      root_path:{
        type: DataTypes.STRING(50),
      },
      repo:{
        type: DataTypes.STRING(50),
      },
      branch:{
        type: DataTypes.STRING(50),
      },
      name:{
        type: DataTypes.STRING(50),
      },

      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'categories',
          key: 'category_id'
        }
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      created_by: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "SYS"
      },
      modified_by: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "SYS"
      },
      hooked_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    },
    {
      freezeTableName: true,
      tableName: "apps",
      timestamps: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
      indexes: [
        {
          name: "apps_pkey",
          unique: true,
          fields: [
            { name: "app_id" },
          ]
        },
        {
          name: "apps_webhook_url_key",
          unique: true,
          fields: [
            { name: "webhook_url" },
          ]
        },
        {
          name: "apps_compose_path_key",
          unique: true,
          fields: [
            { name: "compose_path" },
          ]
        },
        {
          name: "apps_root_path_key",
          unique: true,
          fields: [
            { name: "root_path" },
          ]
        },
        {
          name: "apps_repo_key",
          unique: true,
          fields: [
            { name: "repo" },
          ]
        },
        {
          name: "apps_name_key",
          unique: true,
          fields: [
            { name: "name" },
          ]
        },
      ]
    }
  );

  return entity;
};
