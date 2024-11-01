const express = require("express")
const{register, login} = require("../controllers/authControllers");
const verifyToken = require('../Middlewares/authMiddleware'); 

const router = express.Router();

router.post("/register", register)
router.post("/login", login);

router.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', userId: req.userId });
});

module.exports = router;
