const { Sequelize, DataTypes } = require('sequelize');


module.exports = function(sequelize) {
    class Course extends Sequelize.Model {}

    Course.init({
        title:{
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
                notNull: {
                    msg: 'A title is required'
                },
                notEmpty: {
                    msg: 'Please provide a title'
                }
            }
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A description is required'
                },
                notEmpty: {
                    msg: 'Please provide a description'
                }
            }
        },
        estimatedTime: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     notNull: {
            //         msg: 'A estimated time is required'
            //     },
            //     notEmpty: {
            //         msg: 'Please provide a estimated'
            //     }
            // }
        },
        materialsNeeded: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     notNull: {
            //         msg: 'A name is required'
            //     },
            //     notEmpty: {
            //         msg: 'Please provide a name'
            //     }
            // }
        },
    }, {
        sequelize,
        modelName: 'Course'
    });

    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            foreignKey:{
                allowNull: false,
                fieldName:'UserId',
                validate:{
                    notNull:{
                        msg:"Course owner cannot be blank"
                    },
                    notEmpty:{
                        msg:"Course owner cannot be blank"
                    }
                }   
            }
        });
    };

    return Course;
}
