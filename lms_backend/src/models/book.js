import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

  class Book extends Model {
    static associate(models) {
    }
  }
  Book.init({
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
 
  export default Book