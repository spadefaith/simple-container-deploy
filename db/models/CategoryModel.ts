

export default function CategoryModel (Sequelize, DataTypes) {

  const entity = Sequelize.define(
    "categories",
    {
      category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: DataTypes.STRING(50),
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
      tableName: "categories",
      timestamps: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
      indexes: [
        {
          name: "categories_name_key",
          unique: true,
          fields: [
            { name: "name" },
          ]
        },
        {
          name: "categories_pkey",
          unique: true,
          fields: [
            { name: "category_id" },
          ]
        },
      ]
    }
  );

  return entity;
};
