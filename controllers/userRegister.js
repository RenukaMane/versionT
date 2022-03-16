const mongoose = require('mongoose');
const m_User = require('./../model/m_userModel');
const appError = require('./../utils/appError');
const {log} = require('./../controllers/logger');
const {signToken} = require('./../utils/appJwt')


function ValidateEmail(mail) 
{
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return (true)
    }
  else
     return (false)
}

exports.validateUserInput = (req,res,next)=>{
 
       //check if first_name and last_name are present
        // if(!req.body.first_name || !req.body.last_name) 
        //   return next(new appError('Please enter name',400));
        
        if(!req.body.user_name)
          return next(new appError('Please enter name',400));

         //check if email is present if yes validate email
        if(!req.body.email_id)
          return next(new appError('Please enter email',400));
        else{
           const res = ValidateEmail(req.body.email_id);
             if(!res)
                return next(new appError('Please enter valid email',400));
           } 
     
     next();


}


exports.registerUser = async (req,res,next)=>{

        

    try{

        

        const newUser = await m_User.create({
         user_name: req.body.user_name,
         //last_name : req.body.last_name,
         email_id : req.body.email_id,
         password : req.body.password
        });

        
        const tok = signToken(`${newUser._id}`);

        res.status(201).json({
          id:newUser.id,
          email:newUser.email_id,
          token:tok
        })
  
      }catch(err)
      {
          log.info(err.stack);   
          next(err);

   
      }
}



exports.getAllUsers = async (req,res)=>{

    
    try{
     const User = await m_User.find();
     
     res.status(200).json({
      status:'success',
      data: User

     })

    }catch(err){

        res.status(500).json({
            status: 'fail',
            message: err
        })
 

    }

}