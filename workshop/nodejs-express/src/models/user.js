const { DataTypes } = require('sequelize');

const defineUser = (sequelize) => {
    return sequelize.define('user', {
        name: DataTypes.TEXT,
        age: DataTypes.INTEGER
    });
};

module.exports = defineUser;
