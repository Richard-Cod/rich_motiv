const route = require('express').Router()
const userController = require('../controller/user')

route.get('/', userController.getUsers)
route.get('/:userID', userController.getUserById)
route.post('/', userController.register)


exports.userRoutes = route