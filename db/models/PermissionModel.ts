

export default function PermissionModel (Sequelize, DataTypes) {

  const entity = Sequelize.define(
    "permissions",
    {
      permission_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      description:{
        type: DataTypes.STRING(150),
        allowNull:false
      },
      ref_name:{
        type: DataTypes.STRING(50),
        allowNull:false
      },
      
      sequence: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      scope: {
        type: DataTypes.STRING(50),
        allowNull: false,
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
      tableName: "permissions",
      timestamps: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
      indexes: [
        {
          name: "permissions_description_key",
          unique: true,
          fields: [
            { name: "description" },
          ]
        },
        {
          name: "permissions_pkey",
          unique: true,
          fields: [
            { name: "permission_id" },
          ]
        },
        {
          name: "permissions_ref_name_key",
          unique: true,
          fields: [
            { name: "ref_name" },
          ]
        },
      ]
    }
  );

  return entity;
};
