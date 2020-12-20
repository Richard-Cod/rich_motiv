const route = require('express').Router()
const workController = require('../controller/work')

route.get('/', workController.getWorks)
route.get('/user/:userID', workController.getOneUserWorks)
route.get('/:id', workController.getWorkById)

route.post('/:userID', workController.createUserWork)
route.delete('/:id', workController.deleteWork)


exports.workRoutes = route