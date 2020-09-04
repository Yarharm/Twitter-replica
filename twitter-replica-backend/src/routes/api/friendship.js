const router = require('express').Router();
const controllerFacade = require('../../controllers');
const auth = require('../../middleware/auth');

router.get(
  '/following',
  auth,
  controllerFacade.friendshipController.getFollowing
);
router.get(
  '/follower',
  auth,
  controllerFacade.friendshipController.getFollowers
);
router.post('/follow', auth, controllerFacade.friendshipController.followUser);
router.post(
  '/unfollow',
  auth,
  controllerFacade.friendshipController.unfollowUser
);

module.exports = router;
