const {User,Work} = require('../models/db')
const _ = require('lodash')

 const Util = require('../util')


module.exports = {

    async getWorks(req, res) {
        try {
            const works = await Work.findAll({
                order: [ ['id', 'DESC']],
           
            })

            res.send(works)
        } catch (error) {
            res.status(400).send({error, msg: "impossible to get works"})

        }
    },

    async getOneUserWorks(req, res) {
        const userID = parseInt(req.params.userID)

        try {
            const works = await Work.findAll({where : {UserId: userID}})
            res.send(works)
        } catch (error) {
            res.status(400).send({error, msg: "impossible to get that user works"})

        }
    },

    async getWorkById(req, res) {
        const id = parseInt(req.params.id)

        try {
            const onework = await Work.findOne({where: {id}})
            if (onework != null) {
                res.send(onework)
            }
            res.status(400).send({error, msg: "impossible to get work by id in try"})

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

    async deleteWork(req, res) {
        // Recuper le userID depuis le parametre 
        const id = parseInt(req.params.id)

        const onework = await Work.findOne({where: {id}})
        if (onework == null) return res.status(400).send({msg: "work not found "})


        try {
            const result = await onework.destroy()
            if (result) res.send({msg: "work deleted", result})

        } catch (error) {
            res.status(400).send({error, msg: "Unable to remove work"})
        }
    },

  

    async createUserWork(req, res) {
        // date , userID
        const {date} = req.body
        const {userID} = req.params

        console.log(date, userID)

       //Faire les validations 
       
        //Verifier si l'utilisateur n'a pas work aujourd'hui
        const test1 = await Util.userWorkedToday(userID,date)

        if(test1){
           return res.status(400).send({error : "Vous avez deja work aujourd'hui",today:true})
       }

       // Verifier si il n'existe pas 3 Work déja fait dans cette semaine
       const test2 = await Util.userWorked3timesThisWeek(userID)
       if(test2){
           return res.status(400).send({error : "Vous avez deja work 3 fois cette semaine",thisweek:true})
       }

        
        try {
            console.log("creation  zjdejdejde");
            const newWork = await Work.create({date, UserId: userID})
            return res.status(200).send(newWork)
        } catch (error) {
            return res.status(400).send({error, msg: "impossible to create work"})
        }
    },

}