const express = require('express')
require("./db/mongoose")
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000 //para despliegue en heroku

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


//status codes a httpstatuses.com
//200 correct, 400 wrong for user(providing invalid data), 500 wrong because of server

//post to create, get to recibe information

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})