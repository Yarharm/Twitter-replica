var router = require("express").Router();

// Inject individual routes
router.use("/posts", require("./posts"));

// Define validation middleware
router.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;
