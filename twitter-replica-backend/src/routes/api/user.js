const router = require('express').Router();
const controllerFacade = require('../../controllers');
const auth = require('../../middleware/auth');
const mediaUpload = require('../../middleware/media-upload');

router.post('/login', controllerFacade.userController.loginUser);

router.post('/signup', controllerFacade.userController.createUser);

router.get('/user/:usernamePrefix', controllerFacade.userController.getUser);

router.put(
  '/user/:usernamePrefix',
  auth,
  mediaUpload.uploadUser,
  controllerFacade.userController.updateUser
);

module.exports = router;
