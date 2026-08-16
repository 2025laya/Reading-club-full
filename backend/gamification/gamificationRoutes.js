const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  updateProgress,
  leaderboard,
  getUserGamification,
  getMyGamification,
  openBook
} = require("./gamificationController");

router.put("/progress/:id", updateProgress);
router.get("/user/:id", getUserGamification);
router.get("/leaderboard", leaderboard);
router.get("/me", auth, getMyGamification);
router.post("/open-book/:bookId", auth, openBook);

module.exports = router;