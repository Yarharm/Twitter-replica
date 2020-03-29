const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const posts = await Post.find();
    res
      .json({
        message: "Posts fetched successfully",
        posts: posts
      })
      .send();
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content
    });
    const ret = await post.save();
    res.json(ret).send();
  })
);

module.exports = router;
