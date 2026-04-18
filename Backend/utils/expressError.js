class expressError extends Error{
    constructor(statusCode,msg){    
        super();
        this.statusCode = statusCode;
        this.message=msg;
    }
}