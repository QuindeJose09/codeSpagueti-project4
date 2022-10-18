require('dotenv').config();


    const config = {
        port: process.env.PORT ,
        nodeEnv: process.env.NODE_ENV ,     //? Desarrollo, Testing, Produccion

        db: {
            type: process.env.DB_TYPE ,
            host: process.env.DB_HOST ,
            username: process.env.DB_USER ,
            pass: process.env.DB_PASS ,
            BDname: process.env.DB_NAME 
        }
    };


module.exports = config;