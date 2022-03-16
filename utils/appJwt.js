//const {promisify} = require('util');
const jwt = require('jsonwebtoken')


exports.signToken = id => {
  
    const tok =  jwt.sign({id:id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    });
 
     
     return tok;
}


