const rp = require('request-promise')
const config = require('./flureeConfig.json')
const schema = require('../resources/schema.json')
const seedData = require('../resources/seed.json')

//create a blank db
async function newDb() {
    let reqOptions = {
        method: 'POST',
        url: `${config.ip}/fdb/new-db`,
        body: { 'db/id': `${config.network}/${config.db}` },
        json: true
    }
    let db = await rp(reqOptions)
    // console.log(db)
}

async function dbSchema() {
    let reqOptions = {
        method: 'POST',
        url: `${config.ip}/fdb/${config.network}/${config.db}/transact`,
        body: schema,
        json: true
    }
    let sch = await rp(reqOptions)
    // console.log(sch)
}

async function seed() {
    let reqOptions = {
        method: 'POST',
        url: `${config.ip}/fdb/${config.network}/${config.db}/transact`,
        body: seedData,
        json: true
    }
    let s = await rp(reqOptions)
    // console.log(s)
}

async function deploy() {
    try {
        await newDb()
        setTimeout(async function () {
            await dbSchema()
            if (seedData) {
                await seed()
            }
        }, 5000)

    } catch (error) {
        if (error.message.indexOf('The database does not exist within this ledger group') == -1) {
            throw error
        }
        // while (error.message.indexOf('The database does not exist within this ledger group')) {
        //     await dbSchema()
        //     if (seedData) {
        //         await seed()
        //     }
        // }

    }

}
deploy()
