const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
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
            unique: true,
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
    //User.findByCredential
userSchema.statics.findByCredential = async(email, password) => {

    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to log in')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to log in')
    }

    return user
}

//must be a normal function, hash the plain password
userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next() //indica qeu la funcion termino, antes de guardar
})

const User = mongoose.model('User', userSchema)

module.exports = User