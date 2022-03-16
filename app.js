const express = require('express');
const app = express();
const routeUser = require('./routes/usersRoute');
const routeContent = require('./routes/contentRoute');
const {log} = require('./controllers/logger');
const globalErrorHandler = require('./controllers/errorController');

const PORT = process.env.PORT || 3000;


//middleware
app.use(express.json());


//Logger middleware
app.use((req,res,next)=>{
    
     log.info({
        'method':req.method,
        'url':req.path
       });

   next();   
 
 })
 


app.use("/api/v1/Users",routeUser);
app.use("/api/v1/Content",routeContent);

//global error handler middleware
app.use(globalErrorHandler);




module.exports = app;