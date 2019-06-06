const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
    })
    //User.findByCredential

userSchema.statics.findByCredential = async(email, password) => {

    const user = await User.findOne({ email })
    console.log(user)
    if (!user) {
        throw new Error('Unable to log in')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to log in')
    }

    return user
}


//statics access on the model, methond on a specific user
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'oneStringtoAuthofSebas')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
        //console.log(userObject)

    delete userObject.password
    delete userObject.tokens

    return userObject
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