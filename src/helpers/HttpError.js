const messageList = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
}

/** Class representing an Http error. */
class HttpError extends Error {
    /**
     * Create an instance of HttpError.
     * @param {(400 | 401 | 403 | 404 | 409)} status - The http status error.
     * @param {string} - The error message.
    */
    constructor(status, message = messageList[status]) {
        super(message);
        this.status = status;
    }
}

export default HttpError;