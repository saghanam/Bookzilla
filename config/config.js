const environment = process.env.ENVIRONMENT || "development";
import config from "../knexfile.js";

// module.exports = require('knex')(config)
export default config[environment];
