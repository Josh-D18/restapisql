const { Sequelize, DataTypes } = require('sequelize');


module.exports = function(sequelize) {
    class User extends Sequelize.Model {}

    User.init({
        firstName: {
            type: DataTypes.STRING,
            validate: {
                notNull: {
                    msg: 'Please provide "first name"'
                },
                notEmpty: {
                    msg: 'first name cannot be empty'
                }
            },
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            validate: {
                notNull: {
                    msg: 'Please provide a "last name"'
                },
                notEmpty: {
                    msg: 'last name cannot be empty'
                }
            },
            allowNull: false
        },
        emailAddress: {
            type: DataTypes.STRING,
            validate:{ 
                isEmail: true,
                notEmpty: true,
                notNull: {
                    msg: 'Please provide a "email"'
                },
            },
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                notNull: {
                    msg: 'Please provide a "password"'
                }
            },
            allowNull: false,
            len: {
                    args: [8, 20],
                    msg: 'The password should be between 8 and 20 characters in length'
                }
            // set(val) {
            //     if ( val === this.password ) {
            //         const hashedPassword = bcrypt.hashSync(val, 10);
            //         this.setDataValue('password', hashedPassword);
            //     }
            // }
        }
    }, {
        sequelize,
        modelName: 'User'
    });
    User.associate = (models) => {
        User.hasMany(models.Course, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return User;
}