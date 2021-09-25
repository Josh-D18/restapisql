const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  class Course extends Sequelize.Model {}

  Course.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A title is required",
          },
          notEmpty: {
            msg: "Please provide a title",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A description is required",
          },
          notEmpty: {
            msg: "Please provide a description",
          },
        },
      },
      estimatedTime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "An estimated time is required",
          },
          notEmpty: {
            msg: "Please provide an estimated time",
          },
        },
      },

      materialsNeeded: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A materials needed description is required",
          },
          notEmpty: {
            msg: "Please provide materials are needed ",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Course",
    }
  );

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        fieldName: "userId",
        validate: {
          notNull: {
            msg: "UserId cannot be null",
          },
          notEmpty: {
            msg: "UserId cannot be blank",
          },
        },
      },
    });
  };

  return Course;
};
