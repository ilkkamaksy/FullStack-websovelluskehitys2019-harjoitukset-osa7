const logger = require('./logger');
const morgan = require('morgan');
morgan.token('request-body', (req) => {
    return JSON.stringify(req.body);
});

const requestLogger = morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens['request-body'](req, res),
    ].join(' ');
});

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization');
    if ( authorization && authorization.toLowerCase().startsWith('bearer ') ) {
        request.token = authorization.substring(7);
    }
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {

    logger.error(error.message);

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message });
    } else if ( error.name === 'passwordTooShort') {
        return response.status(400).send({ error: 'password is shorter than the minimum allowed length (3)' });
    } else if ( error.name === 'JsonWebTokenError' ) {
        return response.status(401).json({ error: 'invalid token' });
    }
    next(error);
};

module.exports = {
    requestLogger,
    tokenExtractor,
    unknownEndpoint,
    errorHandler
};