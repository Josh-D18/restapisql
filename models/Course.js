const { Sequelize, DataTypes } = require('sequelize');


module.exports = function(sequelize) {
    class Course extends Sequelize.Model {}

    Course.init({
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        estimatedTime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        materialsNeeded: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Course'
    });

    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            foreignKey:{
                allowNull: false
            }
        });
    };

    return Course;
}