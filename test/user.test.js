const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()

const userOne = {
    _id: userOneId,
    name: "Mike",
    email: 'mike@correo.com',
    password: '@-_-@.@-_-@',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async() => {
    await User.deleteMany({})
    await new User(userOne).save()
})

// afterEach(() => {
//     console.log('afer each')
// })
//beforeAll,AfterAll

test('should sing-up a new user', async() => {
    const response = await request(app).post('/users').send({
        name: 'sebastian',
        email: 'sebastian@zapata.com',
        password: 'miClave7777'
    }).expect(201)

    //assert that the database was change correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertion about the response
    //expect(response.body.user.name).toBe('sebastian')
    expect(response.body).toMatchObject({
        user: {
            name: 'sebastian',
            email: 'sebastian@zapata.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('miClave7777')
        //las aserciones deben ser realistas a lo que creemos 
        // que puede salir mal
})

test('should login a existing user', async() => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(user.tokens[1].token).toBe(response.body.token)


})

test('should no login in noneexisting user ', async() => {
    await request(app).post('/users/login').send({
        email: "hias",
        password: "thiscan no be a password"
    }).expect(400)
})

test('should get profile for user', async() => {
    await request(app)
        .get('/users/me')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send()
        .expect(200)
})

test('should no get profile for unathentificated user', async() => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

//should delete acount for user
// failed when no authentificated

test('should delete user', async() => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send()
        .expect(200)
        //actually validtating that the user does no exist in the database
        //console.log(response)
    const user = await User.findById(response.body._id)
    expect(user).toBeNull()
})

test('should no delete user without authetification', async() => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async() => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .attach('avatar', 'test/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
        //expect.any(puede ser String,Number,Buffer)
})

test('Should update valid user fields', async() => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send({
            name: 'pablo'
        }).expect(200)

    const usuarioActualizado = await User.findById(userOneId)
    expect(usuarioActualizado.name).toEqual('pablo')

})

test('Should no updata invalid user fields', async() => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send({
            location: 'cartagena'
        }).expect(400)

})