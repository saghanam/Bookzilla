// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const appDir = process.cwd();

let config = {
  development: {
    client: "postgresql",
    connection: {
      host: "127.0.0.1",
      database: "inventory",
      user: "admin",
      password: "",
    },
    migrations: {
      directory: appDir + "/src/db/migrations",
    },
    seeds: {
      directory: appDir + "/src/db/seeds",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      host: "127.0.0.1",
      database: "inventory",
      user: "admin",
      password: "",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: "127.0.0.1",
      database: "inventory",
      user: "admin",
      password: "admin123",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
export default config;
