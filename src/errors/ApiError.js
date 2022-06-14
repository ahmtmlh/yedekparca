class ApiError extends Error{
    constructor(message, status){
        super(message)
        this.message = message
        this.status = status
    }

    constructor(message){
        this(message, 500)
    }
}

module.exports = ApiError