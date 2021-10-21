const ErrorResponse = require('../utils/errorResponse');

const errorHandler =(err, req, res,next) => {
    // make a coppy from the error objeect
    let error =  {...err}

    error.message = err.message

    //log to console for dev   
    console.log(err)

    // Mongoose bad object id
    if(err.name === 'CastError')  {
        const message = `Resource not found `;
        // sending ErrorResponce from here instead, from controller
        error = new ErrorResponse(message,404)
    }
    
    //Mongoose dublicate Key 
     if(err.code === 11000) {
         const message = 'Duplicate field value entered';
         error = new ErrorResponse(message, 400)
     }

    //  mongoose validateion error
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
}

module.exports = errorHandler;