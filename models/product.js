const { DataTypes } = require("sequelize");
const db = require('../database/connection');
const Brand = require("./brand");

const Product = db.define('Product', {
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    image_url: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DOUBLE
    }
});

Product.belongsTo(Brand, {
    foreignKey: 'brandId',
    as: 'brands'
});

module.exports = Product;
