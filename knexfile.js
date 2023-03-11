// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const path = require('path')
const appDir = process.cwd();
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      database : 'inventory',
      user: 'admin',
      password: ''
    },
    migrations : {
      directory :  appDir + '/db/migrations'
    },
    seeds: {
      directory :  appDir + '/db/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      database: 'inventory',
      user:     'admin',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      database: 'inventory',
      user:     'admin',
      password: 'admin123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
