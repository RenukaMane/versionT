class appError extends Error{
        constructor(message,statusCode){
            super(message);

            this.statusCode = statusCode;
            this.isOperational = true;

            //to skip this class from polluting stacktrace
            Error.captureStackTrace(this,this.constructor);
        }



}

module.exports = appError;