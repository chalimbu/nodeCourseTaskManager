require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5cf6cf1ad814db0e60a69a3c').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async(id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5cf71bd8f28c0c1380743fa2').then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})