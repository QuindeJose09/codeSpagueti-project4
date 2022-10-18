const { Sequelize } = require('sequelize');

const config = require('../config')

const { type, host, username, pass, BDname} = config.db


const db = new Sequelize({
    dialect: type,
    host: host,
    username: username,
    password: pass,
    database: BDname 
});


module.exports = db;