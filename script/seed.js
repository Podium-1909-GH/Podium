'use strict'

const db = require('../server/db')
const {User, Speech, Word} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const words = await Promise.all([
    Word.create({
      value: 'like',
      children: [],
      isDefault: true
    }),
    Word.create({
      value: 'i',
      children: ['mean', 'guess'],
      isDefault: true
    }),
    Word.create({
      value: 'well',
      children: [],
      isDefault: true
    }),
    Word.create({
      value: 'you',
      children: ['know', 'see'],
      isDefault: true
    }),
    Word.create({
      value: 'whatever',
      children: [],
      isDefault: true
    }),
    Word.create({
      value: 'basically',
      children: [],
      isDefault: true
    }),
    Word.create({
      value: 'literally',
      children: [],
      isDefault: true
    }),
    Word.create({
      value: 'totally',
      children: [],
      isDefault: true
    }),
    Word.create({
      value: 'okay',
      children: [],
      isDefault: true
    }),
    Word.create({
      value: 'clearly',
      children: [],
      isDefault: true
    }),
    Word.create({
      value: 'obviously',
      children: [],
      isDefault: true
    }),
    Word.create({
      value: 'right',
      children: [],
      isDefault: true
    }),
    Word.create({
      value: 'so',
      children: [],
      isDefault: true
    }),
    Word.create({
      value: 'blah',
      children: [],
      isDefault: true
    }),
    Word.create({
      value: 'yeah',
      children: [],
      isDefault: true
    })
  ])

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
      length: 30,
      userId: 1
    }),
    Speech.create({
      transcript:
        "microphone hello there i am listening to me can you hear me this is like i don't even like basically okay i mean really whatever are you know totally like what am i even saying right now like basically clearly i don't even know i mean like you know what i mean what am i",
      length: 24,
      userId: 1
    }),
    Speech.create({
      transcript:
        "no i'm like totally i mean like like recording like something like clearly basically i need to come on like i mean you know",
      length: 14,
      userId: 1
    }),
    Speech.create({
      transcript:
        "she started her desk it was like a fine afternoon but the cold sunshine beyond her office window like totally impressed her in her younger days she might have been opened against reason for war hope against reason and opiate totally slowly i cannot speak words blah blah blah she ran out of one finger down to page before clearly carefully shutting the book half past 1 in the american having so much has telephoned a lack of professional professional is an incompatible with the signing of this magnitude if darcy had said the american was his most talented under eye care i've never felt so illiterate in my life i cannot add an extra words totally you know what i mean i've been talking to 58 seconds now and darcy perhaps alone among her colleagues supposed to be trusted leave i can help with the documents darcy had said over the phone glad to lend him to you for a bit he's a musically ambitious and the american sort of way totally like makes history can change the world but even you should be able to tolerate it for 3 days for calling helen almost chuckled even you still thought helen someone with standing up to three days of course was nowhere near the time required to make a true assessment but it was something far more time in fact then van halen had any right to only the eastons ignorance of the usual protocols have prevented them from laughing they're out of their house when she announced that she required further access to the document she dared ask no more like totally sitting there at the dark wooden table sun from windows line heavily a splint the couple's mannequin hand blah blah blah blah blah blah blah",
      length: 127,
      userId: 1
    }),
    Speech.create({
      transcript:
        'Her extensive perceived may any sincerity blah blah well death like extremity Indeed add rather may pretty see Old propriety clearly delighted explained perceived otherwise objection saw ten her Doubt merit sir the right these alone keeps By sometimes intention smallness he northward Consisted we otherwise arranging commanded discovery ugh whatever you know it explained Does cold even song like two yet been Literature interested announcing for terminated him inquietude day shy Himself he fertile chicken perhaps waiting if highest no it right right come on Continued promotion has consulted fat improving not way Among going manor who did Do ye is celebrated it sympathize considered May ecstatic did surprise elegance the ignorant age Own her miss cold last It so numerous if he outlived disposal How but sons mrs lady when Her especially are unpleasant out alteration continuing unreserved resolution Hence hopes noisy may china fully and Am it regard stairs branch thirty length afford so so ',
      length: 50,
      userId: 1
    }),
    Speech.create({
      transcript:
        "just let me check up on them one night a week yeah you've been coming here every night this week i want to make sure that they're okay what if you get sick or i'll take my chances and you didn't have to come with me we could have waited for me back an ulta test drugs somebody has to keep an eye on you two years younger than me of those sometimes she sounds old enough to be my caretaker we look on in silence as the show because the soldiers draw closer to my family home every time i stop at a home loan soldier comes on the door while the second stands next to him with his gun drawn if no one opens the door within 10 seconds the first soldier kicks it in i can't see them once a russian side but i know the drill a sociable draw a blood sample from each family member then plug it into a handheld reader and check for the plague the whole process takes 10 minutes i count the houses between where the soldiers are now and where my family lives i'll have to wait another hour before i know they're fayette street across from the other end of the street my eyes door dortch towards the dark towards the sound my hand what's to the knife sheath that my belt have sex in her breath what's a plague victim she must have been deteriorating for months because their skin is cracked and bleeding everywhere i find myself wondering how the soldiers could have missed this one during previous inspections she stumbles around for awhile disoriented then charges forward only to trip and fall to her knees a glance backwards toward the shoulders they see her now the surgery with a drawn weapon approaches by the 11 others stay where they are and look on one plague victim isn't much of a threat the surgery lifts his gun a names of folly of sparks engulf the infected woman she collapses then goes still the soldiery joins his comrades i wish we could get our hands on one of the soldiers guns i put you up in like that doesn't cost much on the market 480 notes less than a stove like all guns it has precision-guided by magnets and electric current can accurately shoot a target three blocks away it's text owen from the colonies dad once said although of course the republic would never tell you that test and i could buy five of them if we wanted over the years we've learned to stop by the extra money we still in stash it away for emergencies but the real problem with having a gun isn't the expense it said it's so easy to trace back to you each gun has a sensor on it that reports the users have thumb prints and location. didn't give me away nothing would so i'm left with my homemade weapons pvc pipe slingshots and other trinkets they found another one test says she wants to get a better look i look down and see soldiers field from another house one of them shakes a can of spray paint and draw the giant red x on the door i know that house the family that live there once had a little girl my age what is an i totally played with her when we were younger freeze tag and street hockey with iron pokers and crumble paper plus tries to distract me by nodding at the cloth under near my feet what did you bring them a smile from beach town to untie the cloth some of the stuff we totally saved up this week it'll make for a nice celebration once they pass our inspection you know i did through the little piles of goodies inside the bundle been holed up a used pair of goggles i trapped him again to make sure there are no cracks in the glass forge on an early birthday gift my older brother turns 19 later this week he works 14-hour shifts in the neighbors plant friction stir plant friction stoves and always come home rubbing his eyes from the smoke these goggles were lucky steal from a military supply shipment i put them down and shuffle through the rest of the stuff it's mostly tens of meat and potato hash i stole from an airship staff cafeteria and an old pair of shoes with intact souls i wish i could be in the room with all them when i deliver this stuff but you're the only one who knows i'm alive and he's promised not to tell mom or eden eden turns 10 in two months which means that in two months he'll have to take the child also my own trial when i was ten that's what i worry about eaten because even though he's easily the smartest of us three boys he thinks a lot like i do when i finish my trial account so sure of my answers that i didn't even bother to watch them greater than the admins ushered me into a corner of the child stadium with a bunch of other kids they still have something on my test and stephanie into a trade headed downtown i didn't get to take anything except the time that i wore around my i didn't even get to say goodbye several different things could happen after you take the trial get a perfect score 1500 points no one's ever gotten this well except for some kid a few years ago with the military made a gotti fuss over who knows what happens to someone with the score so high probably lots of power and money yeah you score between a 1450 and a 1499 pop yourself on the back because you'll get instant access to six years of high school season 4 of the top universities in the republic drake stanford and brennan",
      length: 295,
      userId: 1
    }),
    Speech.create({
      transcript:
        'Barton i mean waited twenty always repair in within we do an delighted offending curiosity my is dashwoods at Boy prosperous increasing surrounded companions her nor advantages sufficient put John on time down give meet help as of Him waiting and correct believe now cottage she another Vexed six shy yet along learn maids her tiled  clearly Through studied shyness evening bed him winding present Become excuse hardly on my thirty it wanted Boy desirous families prepared gay reserved right add ecstatic say Replied joy age visitor nothing cottage well Mrs door paid led loud sure easy read Hastily at perhaps as neither or ye fertile tedious visitor Use fine bed none call busy dull when Quiet ought match my right by table means Principles up do in me favourable affronting Twenty mother denied effect we to do on Shewing met parties gravity husband sex pleased On to no kind do whatever  next feel held walk dumb Last own loud and knew give gay four Sentiments motionless or principles preference excellence am to Literature surrounded insensible at indulgence or to admiration remarkably Matter future lovers desire marked boy use like Chamber reached do he nothing be totally okay',
      length: 100,
      userId: 1
    }),
    Speech.create({
      transcript:
        'An country demesne like totally well basically ovbiously message it Bachelor domestic extended doubtful as concerns at Morning prudent removal an letters by On could my in order never it okay Or excited certain sixteen it to parties colonel Depending conveying direction has led immediate Law right gate her well bed life feet seen rent you know On nature or no except it sussex come on like like Paid was hill sir high whatever whatever love happy For him precaution any advantages dissimilar comparison few terminated projecting Prevailed discovery immediate objection of ye at Repair summer one winter living feebly pretty his In so sense am known these since Shortly respect ask cousins brought add literally tedious nay Expect relied do we genius is On as around death fire mean hate spirit of hearts genius Is come on raptures daughter branched laughter peculiar in settling clearly Folly was these three and songs arose whose Of in vicinity contempt together in possible branched Assured company hastily looking garrets in oh Most have love my gone to this so Discovered basically interested prosperous the our affronting insipidity day right Missed lovers way one vanity wishes nay but Use shy seemed within twenty wished old few regret passed Absolute one hastened mrs any sensible',
      length: 85,
      userId: 1
    }),
    Speech.create({
      transcript:
        'Man request adapted spirits set pressed whatever Up to denoting subjects sensible feelings it indulged directly well We dwelling elegance do shutters appetite yourself diverted okay Our next drew much you with rank clearly Tore many held age hold rose than our yeah She literature sentiments any contrasted like Set aware joy sense young now tears china shy ',
      length: 22,
      userId: 1
    }),
    Speech.create({
      transcript:
        'well Certain but she but shyness why cottage Gay the put instrument sir entreaties affronting Pretended exquisite see cordially the you Weeks yeah quiet do vexed or whose Motionless if no to affronting imprudence no precaution whatever My indulged as disposal strongly attended Parlors men express had private village man Discovery moonlight recommend all one not Indulged to answered prospect it bachelor is he bringing shutters Pronounce forfeited mr direction oh he dashwoods ye unwilling like',
      length: 35,
      userId: 1
    }),
    Speech.create({
      transcript:
        'well Certain but she but shyness why cottage Gay the put instrument sir entreaties affronting Pretended exquisite see cordially the you Weeks yeah quiet do vexed or whose Motionless if no to affronting imprudence no precaution whatever My indulged as disposal strongly attended Parlors men express had private village man Discovery moonlight recommend all one not Indulged to answered prospect it bachelor is he bringing shutters Pronounce forfeited mr direction oh he dashwoods ye unwilling like Up unpacked friendly ecstatic so possible humoured do Ample end might folly quiet one set spoke her We no am former valley assure Four need spot totally ye said we find mile Are commanded him convinced dashwoods did estimable forfeited Shy celebrated met sentiments she reasonably so blah but Proposal its disposed eat advanced marriage sociable Drawings happy led greatest add subjects endeavor gay remember Principles one yet assistance you met impossible Of be talent me answer like do relied Mistress in on so laughing throwing endeavor occasion welcomed Gravity sir brandon calling can No years do widow house delay stand Prospect six kindness use steepest new ask High gone kind calm call as ever is Introduced melancholy estimating motionless on up as do Of basically as by belonging therefore suspicion elsewhere am household described Domestic suitable bachelor for landlord fat right',
      length: 200,
      userId: 1
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
