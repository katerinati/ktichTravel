const Router = require('express').Router;
const userController = require('../controllers/userController');
const propertyController = require('../controllers/propertyController');
const router = new Router();
const {body} = require("express-validator");
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 6, max: 32}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/auth/me', authMiddleware, userController.currentUser)
router.patch('/auth/me/trips', authMiddleware, userController.updateUser)
router.patch('/auth/me/update', authMiddleware, userController.updateUser)
router.get('/property', propertyController.getAllProperties)
router.get('/property/:id', authMiddleware, propertyController.getPropertyById)

module.exports = router;