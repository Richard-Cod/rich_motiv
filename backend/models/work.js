const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = (sequelize, DataTypes) => {
    const Work = sequelize.define('Work', {
        date: {
            type: DataTypes.DATE,
        },
    })

   
    return Work
}