const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");

const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createComment/:id", commentsController.createComment);

//delete formula route
router.delete("/deleteComment/:postid/:commentid", commentsController.deleteComment);

module.exports = router;