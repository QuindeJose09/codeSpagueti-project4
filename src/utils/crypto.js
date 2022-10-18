    //? Dependencies
const bcrypt = require('bcrypt');


    //* Encripta la pass del usuario cuando se crea o se modifica el pass
    const hashPassword = (plainTextPassword) => {
        return bcrypt.hashSync(plainTextPassword, 10);
        //* se encripta varias veces
    };


    const comparePassword = (plainTextPassword , hashedPassword) => {
        // Usado en un login, tomamos el pass del usuario y la comparamos con la que tenemos en BD
        //* plainTextPassword:  Contraseña que recibimos del login
        //* hashedPassword:  Contraseña que tenemos en la BD
        return bcrypt.compareSync(plainTextPassword , hashedPassword);
        //  (root, axrgklhñhglfk)
    }


module.exports = {
    hashPassword, comparePassword
}