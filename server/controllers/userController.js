const userServices = require('../service/userService');

class UserController {
    async registration(req,res, next) {
        try {
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

        } catch (error) {
        }
    }
    async logout(req,res, next) {
        try {

        } catch (error) {
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

        } catch (error) {
        }
    }
    async getUsers(req,res, next) {
        try {
            res.json(['hi Djopkin'])
        } catch (error) {
        }
    }
}

module.exports = new UserController();