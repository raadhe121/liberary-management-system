import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class User extends Model {
  static associate(models) {
    User.belongsTo(models.Role, { foreignKey: 'roleId' });
    User.belongsToMany(models.UserBook, { foreignKey: 'userId' });
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,  
    primaryKey: true,    
    allowNull: false,    
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,     
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,    
    unique: true,         
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,     
  },
  number: DataTypes.STRING,
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,    
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users',    
});

export default User;
