const router = require("express").Router();

const authServicios = require("./auth.services");

const { registerUser } = require("../users/users.services");

//  /api/v1/auth

router.post("/register", registerUser);

router.post("/login", authServicios.login); 

module.exports = router;

//!     /api/v1/users/
//!     /api/v1/auth/register
//!     /api/v1/auth/login 
