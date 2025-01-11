class ApiError extends Error {
    constructor(statusCode,
                message,
                errors=[],
                stacks=""
            ) {
            super(message)
            this.statusCode = statusCode;
            this.message=message;
            this.errors=errors;

            if(stacks){
                this.stacks=stacks;
            }
            else{
                Error.captureStackTrace(this,this.constructor);
                // here this is used as the first argument to put this captured stack trace in this object
                // here this.constructor is written to exclude this constructor from the stack tracing
            }
    }
};

export default ApiError;