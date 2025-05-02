import app from './src/app.js';
import dotenv from 'dotenv';
import sequelize from './src/config/db.js';

dotenv.config()

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
      await sequelize.authenticate();
      await sequelize.sync();
      app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.log("asdfasdf",error);
    
      process.exit(1);
  }
};

startServer();
