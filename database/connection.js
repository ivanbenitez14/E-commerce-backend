const { Sequelize } = require("sequelize");

const db = new Sequelize('node', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});

module.exports = db;