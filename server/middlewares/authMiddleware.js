const ApiError = require('../exception/apiError');
const tokenService = require('../service/tokenService');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            // throw ApiError.UnauthorizedError()
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        console.log('i am here')
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};