const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../service/mailService');
const tokenService = require('../service/tokenService');
const UserDto = require("../dtos/userDto");
const ApiError = require("../exception/apiError");
const req = require("express/lib/request");


class UserService {
    async registration(id, email, password) {
        const candidate = await UserModel.findOne({email});
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с таким ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await UserModel.create({id, email, password: hashPassword, activationLink});
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink});
        if (!user) {
            throw ApiError.BadRequest("Некорректная ссылка")
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({email});
        if (!user) {
            throw ApiError.BadRequest("Пользователь с таким email не найден")
        }
        const isPasswordsEquals = await bcrypt.compare(password, user.password);
        if (!isPasswordsEquals) {
            throw ApiError.BadRequest("Неверный пароль")
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto,
        }
    }

    async getAllUsers() {
        const users = await UserModel.find();
        console.log('getAllUsers')
        return users;
    }

    async updateUser(req, res) {
        const {firstName, lastName, age, dreamCountry} = req.body;
        const user = await UserModel.findOneAndUpdate({_id: req.user.id}, {
            firstName,
            lastName,
            age,
            dreamCountry
        }, {new: true});


        const userDto = new UserDto(user);

        return {
            user: userDto,
        }
    }

    async addTrip(req) {
        console.log(req.body)
        const user = await UserModel.findOneAndUpdate({_id: req.user.id}, {$push: {travelHistory: req.body}}, {new: true});
        console.log('addTrip', req.body, req.user.id)
        const userDto = new UserDto(user);
        return {
            user: userDto,
        }
    }
}

module.exports = new UserService();