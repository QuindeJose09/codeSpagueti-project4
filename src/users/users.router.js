//* dependecies
const router = require('express').Router();
const passport = require('passport')
//* file
const usersServices = require('./users.services');

const adminValidate = require('../midleware/role.middleware');

require('../midleware/auth.midleware')(passport);

    //?Ruta de inf propia del usuario logeado
    router.route('/me')
    .get( passport.authenticate('jwt',{ session: false }) , usersServices.getMyUser)
    .patch( passport.authenticate('jwt', { session: false}) ,usersServices.patchMyUser)
    .delete( passport.authenticate('jwt', {session: false}) , usersServices.deleteMyUser)


    router
        .get('/', passport.authenticate('jwt', { session: false }), usersServices.getAllUsers);


    router.route('/:id')
        .get(usersServices.getUserById)
        .patch( passport.authenticate('jwt',{ session: false }), adminValidate  ,usersServices.patchUser)
        .delete(passport.authenticate('jwt',{ session: false }), adminValidate ,usersServices.deleteUser);

module.exports = router
