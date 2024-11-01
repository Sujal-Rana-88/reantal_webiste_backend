const express = require("express");
const multer = require("multer");
const { lendGame } = require("../controllers/LendingGame/LendGamePost");
const { fetchLentGames, fetchAllLentGames } = require("../controllers/LendingGame/FetchLendGameGet");
const authenticate = require("../middlewares/lendingMiddleware");

const router = express.Router();

// Multer configuration for file storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + sanitizedFilename);
  },
});

const upload = multer({ storage });

router.post("/lend", authenticate, upload.single("image"), lendGame);
router.get("/all-games", fetchAllLentGames); 

module.exports = router;
