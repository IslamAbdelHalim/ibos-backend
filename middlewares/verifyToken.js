const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({message: 'token not found'});
  }

  try {
    const tokenUser = jwt.verify(token, process.env.SECRET_KEY || "secret");
    req.user = tokenUser;
    next();
  } catch(err) {
    return res.status(401).json({message: 'Unauthorized'});
  }
}


module.exports = {
  verifyToken
};