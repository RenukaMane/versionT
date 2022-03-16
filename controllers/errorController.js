const req = require('express/lib/request');
const {log} = require('./../controllers/logger');
const appError = require('./../utils/appError');


const handleMongoServerError = ()=>{

    new appError();

}

const handleTokenExpiredError = ()=>{
  
  return(new appError('Your token has expired! Please log in again.', 401));
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  };


  const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
     

    }
    else{

      res.status(500).json({
        message:'Something went very wrong'
      })

    }

  }






module.exports = (err,req,res,next)=>{
   err.statusCode = err.statusCode || 500;
   err.status = err.status || 'error';
   this.isOperational = true;

   //console.log(err.stack);
   log.info(err.stack);
  


   if(process.env.NODE_ENV==='development')
   {
    console.log(err);
    sendErrorDev(err, res);
   }
   else
   {
    let error = { ...err };
    

    //if (err.name === 'MongoServerError') error = handleMongoServerError(error);
    if(err.name === 'TokenExpiredError') err = handleTokenExpiredError(err);
    
    sendErrorProd(err, res);

   }


}