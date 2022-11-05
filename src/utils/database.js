const { Sequelize } = require('sequelize');

const config = require('../config')

const { type, host, username, pass, BDname} = config.db


    const db = new Sequelize({
        dialect: type,
        host: host,
        username: username,
        password: pass,
        database: BDname,
        dialectOptions: 
            //* Si es production, le pasamos un obj
            process.env.NODE_ENV === 'production'
                // Permite conectar una conexion con db real
                ? {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false  
                    }
                }
                : { }
    });


module.exports = db;