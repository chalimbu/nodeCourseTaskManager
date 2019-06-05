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

// const bcrypt = require('bcryptjs')

// const myFunction = async() => {
//     const password = 'red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)
//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('red12345!', hashedPassword)
//     console.log(isMatch)
// }
// myFunction()