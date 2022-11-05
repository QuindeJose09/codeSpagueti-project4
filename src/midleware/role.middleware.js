
  const adminValidate = (req, res, next) => {
      const role = req.user.role;
      
      if (role === 'admin') {
        next()
        // Si lo es -> le vamos a ejeutar el servicio
      } else {

        return res.status(401).json({ message: 'Access Deny!'}) 
      }
      
  }

module.exports = adminValidate
