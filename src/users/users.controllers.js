    //? Dependencies
const uuid = require('uuid');

    //? File
const Users = require('../models/users.models');
const {hashPassword} = require('../utils/crypto')

    //Obtener todo
    const getAllUsers = async () => {
        const data = await Users.findAll();
        return data;
    };

    //Obtener user por id  - lo usamos en midleware, validar el tk del user
    const getUserById = async (idParams) => {
        const data = await Users.findOne({
            where: {
                id: idParams
            }
        });
        //? Si no encuentra nada, arroja null
        return data;
    };

    //Crear user
    const createUser = async (data) => {
        const newUser = await Users.create({
            id: uuid.v4(),
            password: hashPassword(data.password),
            firstName: data.firstName,
            lastName: data.lastName ,
            email: data.email ,
            phone: data.phone ,
            birthday: data.birthday,
            gender: data.gender ,
            country: data.country ,
            // role: data.role ,    no va.
            // status: data.status ,  no va.
            // isVerified: data.isVerified  no va.
            //! Le definimos valores por defecto para el user no haga lo que quiera.
        })
        return newUser;
    }

    //Actualizar user
    const updateUsers = async (id_params,data) => {
        const response = await Users.update(data, {
            where: {
                id: id_params
            }
        });
        return response;
    }

    //Eliminar user
    const deleteUser = async (id_params) => {
        const data = await Users.destroy({
            where: {
                id: id_params
            }
        })
        return data;
    }


    //Obtener user por email    estafas piramidales.. youtube hackeado, 
    //  Investigar a que user , para el user logueado.
    const getUserByEmail = async (email_params) => {
        const data = await Users.findOne({
            email:  email_params
        });
        return data;
    }

    
module.exports = {
    getAllUsers, getUserById, createUser, updateUsers , deleteUser
    ,getUserByEmail
}