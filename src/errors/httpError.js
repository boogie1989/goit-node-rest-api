export class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }

    toJSON() {
        return {
            message: this.message,
        }
    }
}

export class BadRequestError extends HttpError {
    constructor(message = "Bad Request") {
        super(400, message);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message = "Unauthorized") {
        super(401, message);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message = "Forbidden") {
        super(403, message);
    }
}

export class NotFoundError extends HttpError {
    constructor(message = "Not Found") {
        super(404, message);
    }
}

export class ConflictError extends HttpError {
    constructor(message = "Conflict") {
        super(409, message);
    }
}


export class ServerError extends HttpError {
    constructor(message = "Server error") {
        super(500, message);
    }
}
