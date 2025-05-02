import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";


  class Role extends Model {

    static associate(models) {
    }
  }
  Role.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  Role.associate = function(models) {
    Role.hasMany(models.User, { foreignKey: 'roleId' });
  };

  export default Role
