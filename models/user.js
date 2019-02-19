module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define('User', {
    id: {
      type:DataTypes.STRING,
      primaryKey: true,
      validate: {
        allowNull: false,
        len: [8, 40]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/g
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/g
      }
    },
    tier: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
    tableName: "user"
  });
  return user;
};
