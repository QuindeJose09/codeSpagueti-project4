const router = require('express').Router();
const passport = require('passport')

require('../midleware/auth.midleware')(passport)
    //? File
const usersServices = require('./users.services');

    router.get('/',
    passport.authenticate('jwt',{ session: false }), usersServices.getAllUsers)


    //?Ruta de inf propia del usuario logeado
    router.route('/me')
    .get( passport.authenticate('jwt',{ session: false }) , usersServices.getMyUser)
    .patch( passport.authenticate('jwt', { session: false}) ,usersServices.patchMyUser)
    .delete( passport.authenticate('jwt', {session: false}) , usersServices.deleteMyUser)


    router.route('/:id')
    .get(usersServices.getUserById)
    .patch(usersServices.patchUser)
    .delete(usersServices.deleteUser);

module.exports = router
 