const { DataTypes } = require("sequelize")


module.exports = sequelize => {
    sequelize.define('breed', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isAlpha: true
            }
        },
        minHeight: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 99,
                isNumeric: true,
                isSmallerThanMaxHeight(value) {
                    if (value > this.maxHeight) {
                        throw new Error('minimum height must be smaller than maximum height.');
                    }
                }
            }
        },
        maxHeight: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 99,
                isNumeric: true
            }
        },
        minWeight: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 99,
                isNumeric: true,
                isSmallerThanMaxWeight(value) {
                    if (value > this.maxWeight) {
                        throw new Error('minimun weight must be smaller than maximum weight.');
                    }
                }
            }
        },
        maxWeight: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 99,
                isNumeric: true
            }
        },
        startLifeSpan: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 99,
                isNumeric: true,
                isSmallerThanEndLifeSpan(value) {
                    if (value > this.endLifeSpan) {
                        throw new Error('start life span must be smaller than end life span.');
                    }
                }
            }
        },
        endLifeSpan: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 99,
                isNumeric: true
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        }
    })
}