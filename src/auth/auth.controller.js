//  Controlador:    Verificar/validar una cuenta
//  Hacemos control por que no queremos servicies amontonado.

//  File
const { getUserByEmail } = require('../users/users.controllers')

const { comparePassword } = require('../utils/crypto')

    const loginUser = async (email , password) => {
        
        try {
            const dataUsers = await getUserByEmail(email)
            // dataUsers.password

            const verifyPassword = comparePassword(password , dataUsers.password)
        
            if(verifyPassword){
                return dataUsers;
            }

            return false;

        } catch (err) {
            return false;
        };

    }

module.exports = {
    loginUser
};