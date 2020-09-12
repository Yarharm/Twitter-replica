const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const properties = require('../properties');

const Post = mongoose.model('Post');

exports.getPost = asyncHandler(async (req, res) => {
  try {
    const result = await Post.findById(req.params.postId);
    res.json(result).send();
  } catch (err) {
    res.status(500).json({ message: 'Could not find post' }).send();
  }
});

exports.getPosts = asyncHandler(async (req, res) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.currentPage;
  let posts;
  try {
    if (pageSize && typeof currentPage !== 'undefined') {
      posts = await Post.find({
        creatorUsernamePrefix: req.params.usernamePrefix,
      })
        .skip(pageSize * currentPage)
        .limit(pageSize);
    } else {
      posts = await Post.find({
        creatorUsernamePrefix: req.params.usernamePrefix,
      });
    }
    const postCount = await Post.countDocuments({
      creatorUsernamePrefix: req.params.usernamePrefix,
    });
    res.json({ posts, totalPostsCount: postCount }).send();
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch posts' }).send();
  }
});

exports.createPost = asyncHandler(async (req, res) => {
  const creationTime = Math.floor(+Date.now() / 1000);
  const post = new Post({
    content: req.body.content,
    mediaPath: req.file.location,
    creatorId: req.userData.id,
    creatorUsernamePrefix: req.userData.usernamePrefix,
    creationTime: creationTime,
  });
  try {
    const ret = await post.save();
    res.json(ret).send();
  } catch (err) {
    res.status(500).json({ message: 'Could not add post' }).send();
  }
});

exports.updatePost = asyncHandler(async (req, res) => {
  const currentMedia = req.file ? req.file.location : req.body.mediaPath;

  const post = new Post({
    _id: req.body.id,
    content: req.body.content,
    mediaPath: currentMedia,
    creatorId: req.userData.id,
    creatorUsernamePrefix: req.userData.usernamePrefix,
  });

  try {
    const result = await Post.updateOne(
      { _id: req.params.postId, creatorId: req.userData.id },
      post
    );
    if (result.n <= 0) {
      res.status(401).json({ message: 'Not authorized' }).send();
    }
    res.json(post).send();
  } catch (err) {
    res.status(500).json({ message: 'Could not update post' }).send();
  }
});

exports.deletePost = asyncHandler(async (req, res) => {
  try {
    const result = await Post.deleteOne({
      _id: req.params.postId,
      creatorId: req.userData.id,
    });
    if (result.n <= 0) {
      res.status(401).json({ message: 'Not authorized' }).send();
    }

    const totalPosts = await Post.estimatedDocumentCount();
    res.json({ totalPosts }).send();
  } catch (err) {
    res.status(401).json({ message: 'Could not remove post' }).send();
  }
});
