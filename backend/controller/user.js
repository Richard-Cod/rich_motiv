const {User,Work} = require('../models/db')
const bcrypt = require('bcryptjs')
const _ = require('lodash')

module.exports = {

    async getUsers(req, res) {
       

        try {
            const users = await User.findAll({
                include: [{
                    model: Work,
                  }]
            })
            res.send(users)
        } catch (error) {
            res.status(400).send({error, msg: "impossible to get users"})

        }
    },

    async getUserById(req, res) {
        const userID = parseInt(req.params.userID)

        try {
            const oneuser = await User.findOne({where: {id: userID}})
            if (oneuser != null) {
                res.send(oneuser)
            }
            res.status(400).send({error, msg: "impossible to get user by id in try"})

        } catch (error) {
            res.status(400).send({error, msg: "impossible to get user by id"})
        }
    },

    // async updateUser(req, res) {
    //     const userID = parseInt(req.params.userID)
    //     console.log("ggggggggg ", userID)
    //     const {username, email} = req.body
    //     try {
    //         const oneuser = await User.findOne({where: {id: userID}})
    //         console.log("oneuser ", oneuser)
    //         if (oneuser == null) return res.status(400).send({msg: "user not found "})
    //         await oneuser.update({username, email})
    //         res.send({msg: "user update with success", user: oneuser})
    //     } catch (error) {
    //         console.log(error)
    //         res.status(400).send({error, msg: "impossible to update users"})
    //     }
    // },

    // async deleteUser(req, res) {
    //     // Recuper le userID depuis le parametre 
    //     const userID = parseInt(req.params.userID)

    //     const oneuser = await User.findOne({where: {id: userID}})
    //     if (oneuser == null) return res.status(400).send({msg: "user not found "})


    //     try {
    //         const result = await oneuser.destroy()
    //         if (result) res.send({msg: "user delete", result})

    //     } catch (error) {
    //         res.status(400).send({error, msg: "Unable to remove user"})
    //     }
    // },

    async register(req, res) {

        // Gestion des erreurs
        const {error} = User.validate(req.body);

        console.log("Erreurs ", error);
        if (error) return res.status(400).send(error.details[0].message);

        // Tester si l'utilisateur n'existe pas déja
        let user = await User.findOne({where: {email: req.body.email}})
        if (user) return res.status(400).send({error: "User already registered."});

        // Creer un utilisateur 
        try {
            user = await User.create(_.pick(req.body, ["username", "email", "password"]));

        } catch (error) {
            const uniqueUsernameConstraint = error.errors[0].message
            if (uniqueUsernameConstraint) res.status(400).send({error: uniqueUsernameConstraint})
            res.status(400).send({error})

        }

        // Generer le salt et attribuer le password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        await user.save();

        //Generer le token
        const token = User.generateAuthToken(user);

        /*res
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send(_.pick(user, ["_id", "name", "email"]));*/

        // Enlever la propriete password pour pas l'envoyer dans le front    
        user.password = undefined

        // Renvoyer la reponse
        res.status(200).send({user, token})
    },

}