/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  const codysEmail = 'cody@puppybook.com'
  let user = {
    email: codysEmail,
    firstName: 'Cody',
    lastName: 'Pug',
    password: '123'
  }
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', async () => {
    beforeEach(() => {
      return User.create(user)
    })
    await request
      .post('/auth/login')
      .send({email: 'cody@email.com', password: '123'})
    it('GET /api/users/:userId', async () => {
      const res = await request(app)
        .get('/api/users/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
