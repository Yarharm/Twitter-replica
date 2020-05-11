const router = require('express').Router({ mergeParams: true });
const uploadImage = require('../../middleware/mediaUpload');
const auth = require('../../middleware/auth');
const controllerFacade = require('../../controllers');

router.get('/:postId', controllerFacade.postController.getPost);

router.get('/', controllerFacade.postController.getPosts);

router.post('/', auth, uploadImage, controllerFacade.postController.createPost);

router.put(
  '/:postId',
  auth,
  uploadImage,
  controllerFacade.postController.updatePost
);

router.delete('/:postId', auth, controllerFacade.postController.deletePost);

module.exports = router;
