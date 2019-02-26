/* jshint esversion: 6 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  const category = sequelize.define('Category', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
    tableName: "Category"
  });
  return category;
};
