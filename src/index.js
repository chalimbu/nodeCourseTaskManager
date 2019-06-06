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
const multer = require('multer')
const upload = multer({
    dest: 'images/',
    limits: {
        fileSize: 1000000 //1 megabyte, 500 if to big
    },
    fileFilter(req, file, cb) {
        console.log(file.originalname)
        if (!file.originalname.match(/\.(docx)$/)) {
            return cb(new Error('Plis upload doc'))
        }
        cb(undefined, true)
            //cb(new Error('file must be document'))
            //cb(undefined,true)
    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})