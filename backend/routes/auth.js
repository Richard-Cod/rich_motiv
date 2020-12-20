const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {User} = require('../models/db');
const express = require('express');
const router = express.Router();

const Joi = require('joi')

const validate = (user) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    })
    return schema.validate(user);

}

router.post('/login', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send({error: error.details[0].message});

    let user = await User.findOne({where: {email: req.body.email}})
    if (user == null) return res.status(400).send({error: "Invalid credentials."});

    console.log(user.password)

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({error: "Invalid credentials."});

    const token = User.generateAuthToken(user);
    user.password = undefined
    res.send({user, token});
});

exports.authRoute = router;