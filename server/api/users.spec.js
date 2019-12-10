/* global describe beforeEach it */

const {expect} = require('chai')
const supertest = require('supertest') // supertest object lets us make & test HTTP req/res
const db = require('../db')
const app = require('../index')
const agent = supertest.agent(app)
const User = db.model('user')

describe('User routes', () => {
  const codysEmail = 'cody@email.com'
  let user = {
    email: codysEmail,
    firstName: 'Cody',
    lastName: 'Pug',
    password: '123'
  }
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    beforeEach(async () => {
      await User.create(user)
    })

    describe('POST /api/users/:userId/speeches', () => {
      beforeEach(async () => {
        await agent
          .post('/auth/login')
          .send({email: 'cody@email.com', password: '123'})
      })

      it('creates a new speech for a user by userId', async () => {
        const res = await agent
          .post(`/api/users/1/speeches`)
          .expect(201)
          .send({transcript: 'Hello this is me.', length: 4})

        expect(res.body).to.be.an('object')
        expect(res.body.transcript).to.be.equal('Hello this is me.')
        expect(res.body.length).to.be.equal(4)
        expect(res.body.userId).to.be.equal(1)
      })
    })

    describe('GET /api/users/:userId/speeches', () => {
      beforeEach(async () => {
        await agent
          .post('/auth/login')
          .send({email: 'cody@email.com', password: '123'})
      })

      it('gets a speech for a user by userId', async () => {
        const res = await agent
          .get(`/api/users/1/speeches`)
          .expect(200)
          .send([{transcript: 'Hello'}])

        expect(res.body).to.be.an('array')
        // expect(res.body[0].transcript).to.be.equal('Hello')
      })
    })

    describe('PUT /api/users/:userId', () => {
      beforeEach(async () => {
        await agent
          .post('/auth/login')
          .send({email: 'cody@email.com', password: '123'})
      })

      it('updates user first name and last name by ID', async () => {
        const res = await agent
          .put(`/api/users/1`)
          .expect(200)
          .send({firstName: 'CODYYY', lastName: 'PUGGG'})

        expect(res.body).to.be.an('object')
        expect(res.body.firstName).to.be.equal('CODYYY')
        expect(res.body.lastName).to.be.equal('PUGGG')
        expect(res.body.id).to.be.equal(1)
      })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
