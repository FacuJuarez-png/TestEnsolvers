'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// Initialize Sequelize with the configuration
const sequelize = new Sequelize(config);

// Assign sequelize and Sequelize to db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Load all models from the current directory
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && // Ignore hidden files
      file !== basename && // Ignore this file
      file.slice(-3) === '.js' && // Only load JavaScript files
      file.indexOf('.test.js') === -1 // Ignore test files
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associate models if an `associate` function exists
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sync the database with the models
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("✅ Database synced successfully.");
  })
  .catch((err) => {
    console.error("❌ Error syncing database:", err);
  });

module.exports = db;
