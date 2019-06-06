const express = require('express')
require("./db/mongoose")

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000 //para despliegue en heroku

//midleware must be call before other app.use
// app.use((req, res, next) => {
//     //console.log(req.method, req.path)
//     if (req.method === 'GET') {
//         res.status(500).send('Get request are disable')
//     } else {
//         next()
//     }
// })
app.use((req, res, next) => {
    res.status(503).send('Server in maintenance try later')
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


//status codes a httpstatuses.com
//200 correct, 400 wrong for user(providing invalid data), 500 wrong because of server

//post to create, get to recibe information

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const jwt = require('jsonwebtoken')

const myFunction = async() => {
    const autentificacion_toke = jwt.sign({ _id: 'abc123' }, 'anysrieoofcar0a', { expiresIn: '7 days' })
    console.log(autentificacion_toke)
    const data = jwt.verify(autentificacion_toke, 'anysrieoofcar0a')
    console.log(data)
}
myFunction()