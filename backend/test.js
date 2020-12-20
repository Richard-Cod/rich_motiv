

const express = require('express')
// const db = require('./models/db')

// const userRoute = require('./routes/users').userRoutes
// const authRoute = require('./routes/auth').authRoute
// const workRoute = require('./routes/works').workRoutes
const app = express();
// const {sequelize} = db
const config = require('./config/config')
// const cors = require('cors')

// // const swaggerUi = require('swagger-ui-express')
// // const swaggerFile = require('./swagger_output.json')

// app.use(cors())
// app.use(express.json());

// app.use('/api/users', userRoute)
// app.use('/api/works', workRoute)
// app.use('/api/auth', authRoute)

// app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.listen(config.port, () => {
    console.log(`Serveur écoute à l'adresse http://localhost:${config.port}`)
})