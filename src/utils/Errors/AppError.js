class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.explanation = message;
        
        // This is the key field
        this.isOperational = true; 

        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports=AppError;