const mongoose = require('mongoose');
const appError = require('../utils/appError');
const User = require('./../model/m_userModel');
const t_User = require('./../model/t_usersModel');
const {log} = require('./../controllers/logger');
const EmailValidator = require('./../utils/EmailValidator');


exports.updateRange = async (req,res)=>{

    try{

        const email_id = req.body.email_id;
        
        const user = await User.findOneAndUpdate({email_id},{
            Range:req.body.Range
        });
   
            

        console.log(req.body);
        res.status(201).json({
            status:'success',
            data: {
                user: users.Range
            }
        })
  
      }catch(err)
      {
        res.status(500).json({
            status: 'fail',
            message: err
        })
 
  
  
      }


}

exports.getUser = async (req,res)=>{
    try{

        const email = req.body.email_id;
        const users = await User.findById(req.params.id);
        

        //const users = await User.findOne({email});
   
    

        res.status(201).json({
         user_name: users.user_name,
         email_id: users.email_id, 
         Image:users.img
        })
  
      }catch(err)
      {
        log.info(err.stack);   
        res.status(500).json(err.message);
        
 
      }



}

exports.updateProfile = async (req,res,next)=>{

    try{

    
      const email_id = req.body.email_id;   
      const user_name = req.body.user_name;
      
     
        if(!email_id || !user_name)
          return next(new appError('Please provide email or name'),400);  

     
     const user = await User.findOneAndUpdate({email_id},{
         user_name:req.body.user_name
      
     });

     

    res.status(200).json({
        status:'success',
        data: {
            user_name: user.user_name,
            
        }
    })

    }catch(err){

        log.info(err.stack);
        res.status(500).json({
            status: 'fail',
            message: 'Invalid Email' 
        })



    }



} 


//Has trasaction table entry then the master table entry

/*
exports.updateProfile = async (req,res,next)=>{

    try{

      let email_id = req.body.email_id;   
      let first_name;
      let last_name;
      
      //check if email and name is given in body
      if(!email_id || !(req.body.first_name || req.body.last_name))
      return next(new appError('Please provide email or name'),400)

      //validate email
      if(!EmailValidator.ValidateEmail(email_id))
         return next(new appError('Invalid Email',401));

      //get data from m_user
      oldUser = await User.findOne({email_id});

      if(!oldUser)
        return next(new appError('User not found',401));
      
      if(req.body.first_name && req.body.last_name)
      {
         first_name = req.body.first_name;
         last_name = req.body.last_name;
         

      }else if(req.body.first_name){
        first_name = req.body.first_name;
        last_name = oldUser.last_name;
        
      }
      else{
         first_name = oldUser.first_name;
         last_name = req.body.last_name;

      }
 
//check if the name is new or old 
if((first_name === oldUser.first_name) && (last_name === oldUser.last_name))
return next(new appError('Please provide new name'),401);


    const name = first_name + " " + last_name;



       

      const session = await User.startSession();

      const transactionOptions = {

        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' }
    
       };
  


       const transactionResults = await session.withTransaction(async ()=>{
    

          const user = await User.findOneAndUpdate({email_id},{
            first_name:req.body.first_name,
            last_name:req.body.last_name
        },{session});

        const tUser = await t_User.create({
            user_id: user._id,
            change:'name',
            old: user.first_name + " " + user.last_name,
            new: first_name + " " + last_name
          },{session})  
   
   
      },transactionOptions);
     
      
     
     

    res.status(200).json({
        status:'success',
        data: {
            message:'Name Updated'
            
        }
    })

    }catch(err){

        log.info(err.stack);
        
        next(err)



    }



} */

/*
exports.updateProfileImage = async (req,res,next)=>{

    try{
    

     
     const email_id = req.body.email_id;
     console.log(req.file);
    // if(!email_id)
     //return next(new appError('Please provide email'),404);  

     const user = await User.findOneAndUpdate({email_id},{
         img:req.file.path
     });
        

       res.status(200).json({
           status: 'success',
           data: user.img
       });
      

    }catch(err){

        log.info(err.stack);
        next(err)


    }


    



}*/