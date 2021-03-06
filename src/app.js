const express = require('express')
require("./db/mongoose")
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
    //const port = process.env.PORT //para despliegue en heroku

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


//status codes a httpstatuses.com
//200 correct, 400 wrong for user(providing invalid data), 500 wrong because of server

//post to create, get to recibe information

module.exports = app