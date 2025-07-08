const messageList = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
}

/**
 * Creates an instance of HttpError
 * @param {(400 | 401 | 403 | 404 | 409)} status - The http status error.
 * @param {string} - The error message.
 * @returns {Error} - The HttpError object.
 */

const HttpError = (status, message = messageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

export default HttpError;