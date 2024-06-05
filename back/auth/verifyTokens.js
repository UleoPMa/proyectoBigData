const jwt = require("jsonwebtoken");


function verifyAcessToken(token){
   return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

function verifyRefreshToken(token){ 
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = { verifyAcessToken, verifyRefreshToken };