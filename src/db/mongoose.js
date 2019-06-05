const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [7, 'To little password'],
        trim: true,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Password must no contain password')
            }
        }
    }
})

// const me = new User({ name: '   sebastian', email: 'seDASDtian@correo.com', password: 'pas23343234' })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })

//description string, completed bolean
const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const myTast = new Task({ description: 'wash clothes' })

myTast.save().then(() => {
    console.log(myTast)
}).catch((error) => {
    console.log(error)
})