class ErrorResponse extends Error {
    // to send an error message and a status code   
    constructor(message, statusCode) {
        // calling the constructor and it has it own message 
        super(message);
        // create a costume class and set what ever is passed in 
        this.statusCode = statusCode
    }
}

module.exports = ErrorResponse;