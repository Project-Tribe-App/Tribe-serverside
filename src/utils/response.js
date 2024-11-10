class Response {
    constructor(status, message) {
        this.status = status;       
        this.message = message;     
    }

    // Static method to send a success response (200 OK)
    static success(res, message) {
        const response = new Response(200, message);
        return res.status(200).json(response);
    }

    // Static method to send a generic error response (500 Internal Server Error)
    static error(res, message) {
        const response = new Response(500, message);
        return res.status(500).json(response);
    }

    // Static method to send a 400 Bad Request response
    static badRequest(res, message) {
        const response = new Response(400, message || 'Bad Request');
        return res.status(400).json(response);
    }

    // Static method to send a 401 Unauthorized response
    static unauthorized(res, message) {
        const response = new Response(401, message || 'Unauthorized');
        return res.status(401).json(response);
    }

    static notFound(res, message) {
        const response = new Response(404, message || 'Not Found');
        return res.status(404).json(response);
    }

    static conflict(res, message) {
        const response = new Response(409, message || 'Conflict');
        return res.status(409).json(response);
    }
}

module.exports = Response;
