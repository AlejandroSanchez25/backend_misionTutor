const { Router } = require('express');
const UserController = require('../controllers/userController');

class UserRouter {
    constructor() {
        //Crear ruta como atributo de la clase
        this.router = Router();
        this.config();
    }

    config() {
        //Crear objeto UserController
        const userC = new UserController();
        this.router.post('/user', userC.register);
        this.router.post('/user/auth', userC.login);
        this.router.get('/user',userC.user);
        this.router.post('/user/rol',userC.userByRol);
    }
}

module.exports = UserRouter;