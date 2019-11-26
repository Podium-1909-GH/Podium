'use strict'

const db = require('../server/db')
const {User, Speech, Word} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Pug',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'Adams',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const speeches = await Promise.all([
    Speech.create({
      transcript:
        'hello my name like is bob i am bob bob is very literally tired he really hates cats and talking about himself in the third person this is dumb super dumb cakes puppies happiness happy times i love my like family i want to die i mean like basically you know come on you dumb dumb whatever totally literally the coolest thing ive ever heard',
      length: 20
    })
  ])

  const words = await Promise.all([
    Word.create({
      value: 'like',
      children: []
    }),
    Word.create({
      value: 'i',
      children: ['mean', 'guess']
    }),
    Word.create({
      value: 'well',
      children: []
    }),
    Word.create({
      value: 'you',
      children: ['know', 'see']
    }),
    Word.create({
      value: 'whatever',
      children: []
    }),
    Word.create({
      value: 'basically',
      children: []
    }),
    Word.create({
      value: 'literally',
      children: []
    }),
    Word.create({
      value: 'totally',
      children: []
    }),
    Word.create({
      value: 'okay',
      children: []
    }),
    Word.create({
      value: 'clearly',
      children: []
    }),
    Word.create({
      value: 'obviously',
      children: []
    }),
    Word.create({
      value: 'right',
      children: []
    }),
    Word.create({
      value: 'so',
      children: []
    }),
    Word.create({
      value: 'blah',
      children: []
    }),
    Word.create({
      value: 'yeah',
      children: []
    })
  ])

  console.log(
    `seeded ${users.length} users, ${speeches.length} speeches, and ${
      words.length
    } words`
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
