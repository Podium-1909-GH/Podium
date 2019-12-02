/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const WPM = db.model('wpm')

describe('GET wpm description', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/wpm/:wpm', () => {
    beforeEach(() => {
      return Promise.all([
        WPM.create({
          min: 0,
          max: 115,
          title: 'Slow',
          description:
            'A slower delivery puts more weight behind each word you say. It lets your audience have the time to truly take in the words you are saying and comprehend your message. Martin Luther King Jr. delivered "I have a dream" at 92 wpm. Steve Jobs dropped his pace to 94 wpm when unveiling the original iPhone back in 2007.'
        }),
        WPM.create({
          min: 115,
          max: 150,
          title: 'Conversational',
          description:
            "The average pace for most English speakers. This is a comfortable range for most people to speak at. It's easy to maintain for the speaker and easy to understand for the listener!"
        }),
        WPM.create({
          min: 150,
          max: 161,
          title: 'Podcast Pace',
          description:
            'Most podcasters try to speak between 150 and 160 wpm. The majority of audiobooks also fall in this range. It is a pace where your audience can pick up your words clearly, without feeling too slow.'
        }),
        WPM.create({
          min: 161,
          max: 200,
          title: 'Fast Conversational',
          description:
            'This range still falls inside the realm of everyday speech, but speaking faster than 160 words per minute can add a feeling of urgency to your words.'
        }),
        WPM.create({
          min: 200,
          max: 250,
          title: 'Fast',
          description:
            "Sports Commentaters have to speak quickly to ensure their listeners know what is happening when it's happening."
        }),
        WPM.create({
          min: 250,
          max: 400,
          title: 'Auctioneer',
          description:
            'Auctioneers have to speak fast to keep bids moving. Speaking this fast while remaining articulate is a true skill!'
        }),
        WPM.create({
          min: 400,
          max: 10000,
          title: 'World Record Pace',
          description:
            'Wow! You sure are a fast talker. The current Guinness World record for fastest talker is held by Sean Shannon at a rate of 655wpm.'
        })
      ])
    })

    it('Retrieves the correct wpm description', async () => {
      const res = await request(app)
        .get('/api/wpm/20')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.title).to.be.equal('Slow')
      expect(res.body.min).to.be.equal(0)
    })
    it('Is inclusive on the min', async () => {
      const res = await request(app)
        .get('/api/wpm/161')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.title).to.be.equal('Fast Conversational')
      expect(res.body.min).to.be.equal(161)
    })
  })
})
