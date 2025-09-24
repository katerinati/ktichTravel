const jwt = require('jsonwebtoken');
const tokenModel = require('../models/tokenModel');

class TokenService{
        generateTokens(payload) {
            const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: '30m'});
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
            return {accessToken, refreshToken};
        }
        async saveToken(userId, refreshToken) {
            const tokenData = await tokenModel.findOne({user: userId});
            if(tokenData) {
                tokenData.refreshToken = refreshToken;
                await tokenData.save();
            }
            return tokenModel.create({user: userId, refreshToken})
        }
        async removeToken(refreshToken) {
            const tokenData = await tokenModel.deleteOne({refreshToken});
            return tokenData;
        }
}
module.exports = new TokenService();