const { Pool, Client } = require('pg')
const config = require('./config');
const connectionString = `postgresql://postgres:${config.password}@${config.host}/${config.dbName}`
const pool = new Pool({
  connectionString,
})

const db = new Client({
  connectionString,
})

db.connect()


// Export client
module.exports = db;
