const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = function (sequelize) {
  class User extends Sequelize.Model {}

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: 'Please provide "first name"',
          },
          notEmpty: {
            msg: "first name cannot be empty",
          },
        },
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: 'Please provide a "last name"',
          },
          notEmpty: {
            msg: "last name cannot be empty",
          },
        },
        allowNull: false,
      },
      emailAddress: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          notEmpty: {
            msg: "email cannot be empty",
          },
          notNull: {
            msg: 'Please provide a "email"',
          },
        },
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "password cannot be empty",
          },
          notNull: {
            msg: 'Please provide a "password"',
          },
        },
        set(val) {
          const hashedPassword = bcrypt.hashSync(val, 10);
          this.setDataValue("password", hashedPassword);
        },
        len: {
          args: [8, 20],
          msg: "The password should be between 8 and 20 characters in length",
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: {
        allowNull: false,
        fieldName: "userId",
        validate: {
          notNull: {
            msg: "Course owner cannot be blank",
          },
          notEmpty: {
            msg: "Course owner cannot be blank",
          },
        },
      },
    });
  };
  return User;
};
