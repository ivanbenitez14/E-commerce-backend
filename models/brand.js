const { DataTypes } = require("sequelize");
const db = require('../database/connection');

const Brand = db.define('Brand', {
    name: {
        type: DataTypes.STRING
    },
    logo_url: {
        type: DataTypes.STRING
    }
});

module.exports = Brand;