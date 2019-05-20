//CRUD, create read update delete


const { MongoClient, ObjectID } = require('mongodb')

const id = new ObjectID()


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

//make the connection, the url, ot read well url, and callback
// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//     if (error) {
//         return console.log('Unable to connect to dabase')
//     }
//     const db = client.db(databaseName)

//     db.collection('users').updateOne({
//         _id: new ObjectID('5cdf666363709a2b780a83ba')
//     }, {
//         $inc: {
//             age: 10
//         }
//     }).then((result) => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)
//     })

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to dabase')
    }
    const db = client.db(databaseName)

    db.collection('task').updateMany({

    }, {
        $set: {
            status: true
        }
    }).then((resolve) => {
        console.log(resolve)
    }).catch((reject) => {
        console.log(reject)
    })

})