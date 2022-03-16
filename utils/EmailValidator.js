const appError = require('./appError');


exports.ValidateEmail = (mail)=> 
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
        if(!req.body.first_name || !req.body.last_name) 
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
