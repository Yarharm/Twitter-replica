const asyncHandler = require('express-async-handler');
const router = require('express').Router();
const mongoose = require('mongoose');
const properties = require('../../properties');
const uploadImage = require('../../config/mediaConfig');

const Post = mongoose.model('Post');

router.get(
  '/',
  asyncHandler(async (_, res) => {
    const posts = await Post.find();
    res
      .json({
        message: 'Posts fetched successfully',
        posts,
      })
      .send();
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
    res.status(200).send();
  })
);

module.exports = router;
