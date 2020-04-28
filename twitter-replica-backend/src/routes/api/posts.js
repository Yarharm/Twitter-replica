const asyncHandler = require('express-async-handler');
const router = require('express').Router();
const mongoose = require('mongoose');
const properties = require('../../properties');
const uploadImage = require('../../config/mediaConfig');

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
    res.json({ posts: posts, totalPostsCount: totalPosts }).send();
  })
);

router.post(
  '/',
  uploadImage,
  asyncHandler(async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      mediaPath: url + properties.mediaPath + req.file.filename,
    });
    const ret = await post.save();
    res.json(ret).send();
  })
);

router.put(
  '/:postId',
  uploadImage,
  asyncHandler(async (req, res) => {
    let currentMedia = req.body.mediaPath;

    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      currentMedia = url + properties.mediaPath + req.file.filename;
    }

    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      mediaPath: currentMedia,
    });

    await Post.updateOne({ _id: req.params.postId }, post);
    res.json(post).send();
  })
);

router.delete(
  '/:postId',
  asyncHandler(async (req, res) => {
    await Post.deleteOne({ _id: req.params.postId });
    const totalPosts = await Post.estimatedDocumentCount();
    res.json({ totalPosts: totalPosts }).send();
  })
);

module.exports = router;
