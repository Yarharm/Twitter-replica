const asyncHandler = require('express-async-handler');
const router = require('express').Router();
const mongoose = require('mongoose');
const properties = require('../../properties');
const uploadImage = require('../../configs/mediaConfig');
const auth = require('../auth');

const Post = mongoose.model('Post');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.currentPage;
    let posts;

    if (pageSize && typeof currentPage !== 'undefined') {
      posts = await Post.find()
        .skip(pageSize * currentPage)
        .limit(pageSize);
    } else {
      posts = await Post.find();
    }
    const totalPosts = await Post.estimatedDocumentCount();
    res.json({ posts, totalPostsCount: totalPosts }).send();
  })
);

router.post(
  '/',
  auth,
  uploadImage,
  asyncHandler(async (req, res) => {
    const url = `${req.protocol}://${req.get('host')}`;
    const post = new Post({
      content: req.body.content,
      mediaPath: url + properties.mediaPath + req.file.filename,
      creatorId: req.userData.id,
    });
    const ret = await post.save();
    res.json(ret).send();
  })
);

router.put(
  '/:postId',
  auth,
  uploadImage,
  asyncHandler(async (req, res) => {
    let currentMedia = req.body.mediaPath;

    if (req.file) {
      const url = `${req.protocol}://${req.get('host')}`;
      currentMedia = url + properties.mediaPath + req.file.filename;
    }

    const post = new Post({
      _id: req.body.id,
      content: req.body.content,
      mediaPath: currentMedia,
      creatorId: req.userData.id,
    });

    const result = await Post.updateOne(
      { _id: req.params.postId, creatorId: req.userData.id },
      post
    );
    if (result.nModified <= 0) {
      res.status(401).send();
    }
    res.json(post).send();
  })
);

router.delete(
  '/:postId',
  auth,
  asyncHandler(async (req, res) => {
    const result = await Post.deleteOne({
      _id: req.params.postId,
      creatorId: req.userData.id,
    });
    if (result.n <= 0) {
      res.status(401).send();
    }

    const totalPosts = await Post.estimatedDocumentCount();
    res.json({ totalPosts }).send();
  })
);

module.exports = router;
