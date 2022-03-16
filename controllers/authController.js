const { rmSync } = require('fs');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const m_user = require('./../model/m_userModel')
const {signToken} = require('./../utils/appJwt')
const appErrors = require('./../utils/appError')



exports.login = async (req,res,next)=>{

    try{

        //take email and password from the body
        //const {email_id,password} = req.body;

        const email_id = req.body.email_id;
        const password = req.body.password;
      
        console.log(email_id);

    if(!email_id || !password)
      return next(new appErrors('Please provide email or password',400));

       


    //check if password is correct
    const new_user = await m_user.findOne({email_id});
    
     

    if(!new_user || !await new_user.correctPassword(password, new_user.password)){
      
      return next(new appErrors('Incorrect email or password',401))
    }

    const tok = signToken(`${new_user._id}`);

    

        //send JWT
        res.status(200).json({
            status: 'success',
            token: tok
        })



    }catch(err){

       next(err);
}

}

exports.protect = async (req,res,next)=>{

  try{
//1) Getting a token and check if it's true
let token=undefined;
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
{
    token = req.headers.authorization.split(' ')[1];
    
    
}

if(!token){
  
  return next(new appErrors('You are not logged in pls login to access',401));

}

//2) Verification token
   const decode = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
   

   

  //3)Check if user still exists
    const freshUser = await m_user.findById(decode.id);
    
    if(!freshUser){
        return next(new appErrors('The user belonging to this token no longer exists'),401
        );
    }


//4) Check if user changed password after the token was issued

next();
  }catch(err){

     next(err);

  }
}