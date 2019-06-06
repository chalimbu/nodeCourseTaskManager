const express = require('express')
require("./db/mongoose")

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000 //para despliegue en heroku

//midleware must be call before other app.use



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


//status codes a httpstatuses.com
//200 correct, 400 wrong for user(providing invalid data), 500 wrong because of server

//post to create, get to recibe information

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async() => {
//     // const task = await Task.findById('5cf8fcdfe0c8543bd05fbedc')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5cf8fc440ce1ba3c44e7f045')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()