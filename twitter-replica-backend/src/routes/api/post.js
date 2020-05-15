const router = require('express').Router({ mergeParams: true });
const mediaUpload = require('../../middleware/media-upload');
const auth = require('../../middleware/auth');
const controllerFacade = require('../../controllers');

router.get('/:postId', controllerFacade.postController.getPost);

router.get('/', controllerFacade.postController.getPosts);

router.post(
  '/',
  auth,
  mediaUpload.uploadPost,
  controllerFacade.postController.createPost
);

router.put(
  '/:postId',
  auth,
  mediaUpload.uploadPost,
  controllerFacade.postController.updatePost
);

router.delete('/:postId', auth, controllerFacade.postController.deletePost);

module.exports = router;
