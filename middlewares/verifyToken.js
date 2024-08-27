const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
  // console.log(req.headers)
  const token = req.headers['authorization'].split(' ');
  if (!token[0]) {
    return res.status(401).json({message: 'token not found'});
  }

  try {
    console.log(token[1]);
    const tokenUser = jwt.verify(token[1], process.env.SECRET_KEY || "secret");
    req.user = tokenUser;
    next();
  } catch(err) {
    return res.status(401).json({message: 'Unauthorized'});
  }
}


module.exports = {
  verifyToken
};