//CRUD, create read update delete


const { MongoClient, ObjectID } = require('mongodb')

const id = new ObjectID()


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

//make the connection, the url, ot read well url, and callback
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to dabase')
    }
    const db = client.db(databaseName)

    db.collection('users').findOne({
            _id: new ObjectID('5cdf687c976a2d2b18e66b5a')
        },
        (error, resul) => {
            if (error) {
                return console.log(error)
            }
            console.log(resul)
        })

    db.collection('task').find({ status: true }).toArray((error, documents) => {
        if (error) {
            return console.log(error)
        }
        console.log(documents)
    })


    // db.collection('users').find({ age: 27 }).count((error, count) => {
    //     console.log(count)
    // })

})