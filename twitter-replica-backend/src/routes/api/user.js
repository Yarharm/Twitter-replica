const router = require('express').Router();
const controllerFacade = require('../../controllers');

router.post('/login', controllerFacade.userController.loginUser);

router.post('/signup', controllerFacade.userController.createUser);

module.exports = router;
