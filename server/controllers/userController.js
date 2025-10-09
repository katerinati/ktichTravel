const userServices = require('../service/userService');
const {validationResult} = require("express-validator");
const ApiError = require("../exception/apiError")

class UserController {
    async registration(req,res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
            }
            const {email, password} = req.body;
            const userData = await userServices.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 30,
            })
            return res.json(userData);

        } catch (error) {
           next(error);
        }
    }
    async login(req,res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userServices.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 30,
            })
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
    async logout(req,res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userServices.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (error) {
            next(error);
        }
    }
    async activate(req,res, next) {
        try {
            const activationLink = req.params.link;
            await userServices.activate(activationLink);
            return  res.redirect(process.env.CLIENT_URL)
        } catch (error) {
            console.log(error);
        }
    }
    async refresh(req,res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userServices.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 30,
            })
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
    async getUsers(req,res, next) {
        try {
            const users = await userServices.getAllUsers()
            return res.json(users)
        } catch (error) {
            next(error);
        }
    }
    async currentUser(req,res, next) {
        try {
            const currentUser = req.user;
            return res.json(currentUser);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();