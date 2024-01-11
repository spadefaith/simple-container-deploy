

export default function UserModel (Sequelize, DataTypes) {

  const entity = Sequelize.define(
    "users",
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: DataTypes.STRING(50),
        allowNull:false
      },
      username:{
        type: DataTypes.STRING(50),
        allowNull:false
      },
      email:{
        type: DataTypes.STRING(50),
        allowNull:false
      },
      password:{
        type: DataTypes.STRING(255),
        allowNull:false
      },

      role_id:{
        type: DataTypes.STRING(255),
        references: {
          model: 'roles',
          key: 'role_id'
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
      tableName: "users",
      timestamps: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
      indexes: [
        {
          name: "users_name_key",
          unique: true,
          fields: [
            { name: "name" },
          ]
        },
        {
          name: "users_pkey",
          unique: true,
          fields: [
            { name: "user_id" },
          ]
        },
        {
          name: "users_username_key",
          unique: true,
          fields: [
            { name: "username" },
          ]
        },
        {
          name: "users_email_key",
          unique: true,
          fields: [
            { name: "email" },
          ]
        },
        {
          name: "users_password_key",
          unique: true,
          fields: [
            { name: "password" },
          ]
        },
      ]
    }
  );

  return entity;
};
