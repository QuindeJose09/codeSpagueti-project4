
const jwt = require("jsonwebtoken");

//? mucho ojo
const { loginUser } = require("./auth.controller");

  const login = (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      loginUser(email, password)
        .then( (user) => {
          if (user) {
            const token = jwt.sign({
              id: user.id,
              email: user.email,
              role: user.role,
            }, 'root');

            res.status(200).json({ message: "Correct Credential.", token });
          } else {
            res.status(401).json({ message: "Invalid Credential."});
          }
        })

        .catch((err) => {
          res.status(400).json({ mesage: err.message });
        });
    } else {
      res.status(400).json({ message: "Mising Data." });
    }
  };

module.exports = {
  login,
};
