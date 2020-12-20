const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}
const Joi = require('joi');

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)



const User = require('./user')(sequelize, Sequelize.DataTypes)
const Work = require('./work')(sequelize, Sequelize.DataTypes)

User.validate = (user) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        username: Joi.string().min(3).max(20).required(),
    })
    return schema.validate(user);
}

 User.hasMany(Work)


// User.belongsToMany(Skills, {through: 'Skills'});
// Skills.belongsToMany(User, {through: 'Skills'});

db['User'] = User
db['Work'] = Work


db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db