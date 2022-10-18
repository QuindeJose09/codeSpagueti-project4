const usersControllers = require('./users.controllers');


    const getAllUsers = async (req,res) => {
        usersControllers.getAllUsers()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => { 
            res.status(400).json({ message: err.message})
        })
    };

    const getUserById =  (req,res) => {
        const id = req.params.id
        usersControllers.getUserById(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => { 
            res.status(404).json({ message: err.message})
        })
    };

    //? Crear un user nuevo. va con autentication/autoritation.
    //? Ver que credenciales tiene el user.
    //!  /auth   login, register,
    const registerUser = (req,res) => {
        const {firstName,  lastName, email,password, phone, birthday, gender, country} = req.body;

        if(firstName && lastName && email && password && phone && birthday){
        
            usersControllers.createUser({firstName,  lastName, email,password,phone, birthday, gender, country})
            .then(data => {
                res.status(201).json({ message: 'succes', data })
                })    
            .catch(err => { 
                res.status(400).json({ message: err.message})
            }); 

        } else {
            res.status(400).json({ message: 'All fields must be completed', fields: {
                firstName: 'string', 
                lastName: 'string', 
                email: 'example@example.com',
                password: 'string',
                phone: '+593 0959507329',
                birthday: 'YYYY/MM/DD',
            }});
        }
    }


    const patchUser = (req,res) => {
        const id = req.params.id;
        const {firstName,  lastName, phone, gender, country} = req.body;
        
        usersControllers.updateUsers(id, {firstName,  lastName, phone, gender, country} )
        .then(data => {
            if(data[0]){
                res.status(200).json( { message: `User with ID ${id}, edited succes.`})
            } else {
                res.status(404).json({ message: 'Invalid ID.'})
            }
        })

        .catch(err => { 
            res.status(400).json({ message: err.message})
        }); 
    }; 


    const deleteUser = (req,res) => {
        const id = req.params.id;

        usersControllers.deleteUser(id)
        .then(data => {
            if(data){
                res.status(204).json()
            } else {    
                res.status(404).json({ message: 'Invalid ID.'})
            }
        })
        .catch(err => { 
            res.status(400).json({ message: err.message})
        }); 
    }

    //? My user Logeado -> services
    
    const getMyUser = (req, res) => {
        const id = req.user.id //!inf del tk desencryptado
        // id que sale de mi tk
        console.log(req.user, "cierce");
        console.log(req.user.id, "cierce");

        usersControllers.getUserById(id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => res.status(400).json({ message: err.message}))
    }
    
    //!  firstName, lastName, phone, gender, country 
    const patchMyUser = (req, res) => {
            // user viene del token
            const id = req.user.id;
            const {firstName, lastName, phone,country,gender, birthday} = req.body

        usersControllers.updateUsers(id, { firstName, lastName, phone, country, gender, birthday })
            .then(() => {
                    res.status(200).json({ message: `Your user was edited succesfully.`})
                })
            .catch(err => res.status(400).json({ message: err.message}))
    };


    const deleteMyUser = (req, res) => {
            const id = req.user.id;
        usersControllers.updateUsers(id, { status: 'inactive'})
            .then(() => {
                res.status(200).json( { message: `You user was delete succesfully.`})
            })
            .catch(err => res.status(400).json({ message: err.message}))
}
    
module.exports = {
    getAllUsers,
    getUserById,
    patchUser,
    registerUser,
    deleteUser,
    getMyUser, patchMyUser, deleteMyUser
}


