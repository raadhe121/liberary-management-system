import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Book extends Model {
  static associate(models) {
    Book.belongsToMany(models.UserBook, { foreignKey: 'bookId' });
  }
}

Book.init({
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
  bookStatus: DataTypes.STRING,
  author: DataTypes.STRING,
  status: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Book',
  tableName: 'Books',  
});

export default Book;
