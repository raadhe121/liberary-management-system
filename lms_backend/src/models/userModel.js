import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  number: DataTypes.STRING,
  roleId: DataTypes.INTEGER,
});
User.associate = function(models) {
  User.hasMany(models.Role, { foreignKey: 'roleId' });
};
export default User
