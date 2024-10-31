const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if(!authHeader){
    res.status(401).json({error: "Unauthorized, access denied"});
  }

  try{
    const decodedToken = jwt.verify(authHeader, config.get("JWT_KEY"));

    req.userId = decodedToken.userId;
    
    next();
  }catch(err){
    res.status(401).json({error :"Unauthorized, access denied"});
  }
};

