const knex = require('knex');
const config = require('../knexfile.js');

const dbENV = process.env.DB_ENV || 'development';

module.exports = knex(config[dbENV]);