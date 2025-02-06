class Response {
    constructor(status, message, data = {}) { 
        this.status = status;       
        this.message = message;     
        this.data = data; 
    }

    // Static method to send a success response (200 OK)
    static success(res, message, data = {}) { 
        const response = new Response(200, message, data);
        return res.status(200).json(response);
    }

    // Static method to send a generic error response (500 Internal Server Error)
    static error(res, message, data = {}) {
        const response = new Response(500, message, data);
        return res.status(500).json(response);
    }

    // Static method to send a 400 Bad Request response
    static badRequest(res, message, data = {}) {
        const response = new Response(400, message || 'Bad Request', data);
        return res.status(400).json(response);
    }

    // Static method to send a 401 Unauthorized response
    static unauthorized(res, message, data = {}) {
        const response = new Response(401, message || 'Unauthorized', data);
        return res.status(401).json(response);
    }

    static notFound(res, message, data = {}) {
        const response = new Response(404, message || 'Not Found', data);
        return res.status(404).json(response);
    }

    static conflict(res, message, data = {}) {
        const response = new Response(409, message || 'Conflict', data);
        return res.status(409).json(response);
    }
}

module.exports = Response;