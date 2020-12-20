const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            unique: true
        },

     
        //password: DataTypes.STRING
    })

    User.generateAuthToken = (user) => {
        const {id, username, email} = user
        const payload = {
            id,
            username,
            email
        }
        console.log(payload)
        const token = jwt.sign(
            payload,
            config.authentication.jwtSecret, {expiresIn: 24 * 3600 * 30,}
            //config.get("jwtPrivateKey")
        );
        return token;
    }
    return User
}