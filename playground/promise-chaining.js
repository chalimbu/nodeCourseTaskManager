require('../src/db/mongoose')
const User = require('../src/models/user')


//5cf6cb777bae6c238cd537d8

// User.findByIdAndUpdate('5cf6cd42953c473bf4a830e4', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5cf6cd42953c473bf4a830e4', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})