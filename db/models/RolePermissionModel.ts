

export default function RolePermissionModel (Sequelize, DataTypes) {

  const entity = Sequelize.define(
    "role_permissions",
    {
      role_permission_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'role_id'
        }
      },
      permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'permissions',
          key: 'permission_id'
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
      tableName: "role_permissions",
      timestamps: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
      indexes: [
        {
          name: "role_permissions_pkey",
          unique: true,
          fields: [
            { name: "role_permission_id" },
          ]
        },

        {
          name: "role_permissions_role_id_permission_id_idx",
          unique: true,
          fields: [
            { name: "role_id" },
            { name: "permission_id" },
          ]
        },
      ]
    }
  );

  return entity;
};
