/* global describe beforeEach it */

const {expect} = require('chai')
const supertest = require('supertest')
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

  const murphysEmail = 'murphy@email.com'

  let user2 = {
    email: murphysEmail,
    firstName: 'Murphy',
    lastName: 'Cat',
    password: '123'
  }

  const speeches = [
    {id: 1, transcript: 'Hello', length: 1},
    {id: 2, transcript: 'I am a pug', length: 4}
  ]

  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    beforeEach(async () => {
      await User.create(user)
      await User.create(user2)
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

      it('will not create a speech if the user ID does not match request user', async () => {
        await agent
          .post(`/api/users/2/speeches`)
          .expect(403)
          .send({transcript: 'Hello this is me.', length: 4})
      })
    })

    describe('GET /api/users/:userId/speeches', () => {
      beforeEach(async () => {
        await agent
          .post('/auth/login')
          .send({email: 'cody@email.com', password: '123'})
      })

      it('gets all speeches for a specific user by user ID', async () => {
        await agent.post('/api/users/1/speeches').send(speeches[0])
        await agent.post('/api/users/1/speeches').send(speeches[1])

        const res = await agent.get(`/api/users/1/speeches`).expect(200)

        expect(res.body).to.be.an('array')
        expect(res.body.length).to.be.equal(2)
        expect(res.body[0].transcript).to.be.equal('Hello')
      })

      it('will not get speeches if the user ID does not match request user', async () => {
        await agent.post('/api/users/1/speeches').send(speeches[0])
        await agent.post('/api/users/1/speeches').send(speeches[1])
        await agent.get(`/api/users/2/speeches`).expect(403)
      })
    })

    describe('GET /api/users/:userId/speeches/:speechId', () => {
      beforeEach(async () => {
        await agent
          .post('/auth/login')
          .send({email: 'cody@email.com', password: '123'})
        await agent.post('/api/users/1/speeches').send(speeches[0])
      })

      it('gets a specific speech by its ID for a specific user', async () => {
        const res = await agent.get(`/api/users/1/speeches/1`).expect(200)

        expect(res.body.transcript).to.be.equal('Hello')
      })

      it('will not get a speech if user ID does not match', async () => {
        await agent.get(`/api/users/2/speeches/5`).expect(403)
      })

      it('will not get a speech if speech ID does not exist', async () => {
        const res = await agent.get(`/api/users/1/speeches/5000`).expect(200)

        expect(res.body).to.be.an('object')
        expect(res.body.id).to.be.equal(0)
      })

      it('will not get a speech if speech ID is in invalid format', async () => {
        const res = await agent
          .get(`/api/users/1/speeches/notNumber`)
          .expect(200)

        expect(res.body).to.be.an('object')
        expect(res.body.id).to.be.equal(0)
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

      it('will not update a user if user ID does not match', async () => {
        await agent.put(`/api/users/2`).expect(403)
        await agent.put(`/api/users/5000`).expect(403)
      })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
