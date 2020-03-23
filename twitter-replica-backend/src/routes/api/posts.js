var router = require("express").Router();

router.get("/", (req, res) => {
  const posts = [
    { id: "123", title: "yaro", description: "backend", content: "erpogekpog" }
  ];
  res
    .json({
      message: "Posts fetched successfully",
      posts: posts
    })
    .send();
});

router.post("/", (req, res) => {
  const post = req.body;
  console.log(post);
  res.status(201).send();
});

module.exports = router;
