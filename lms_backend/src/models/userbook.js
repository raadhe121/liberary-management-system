import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class UserBook extends Model {}

UserBook.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Books',
      key: 'id'
    }
  },
}, {
  sequelize,
  modelName: 'UserBook',
  tableName: 'UserBooks', // Optional, to match your migration table name
  timestamps: true // Ensures createdAt and updatedAt are managed automatically
});

// Define associations
UserBook.associate = function(models) {
  UserBook.belongsTo(models.User, { foreignKey: 'userId' });
  UserBook.belongsTo(models.Book, { foreignKey: 'bookId' });
};

export default UserBook;
