const express = require("express");
const router = express.Router();
const { createUser, login, signOut, isAuth } = require('../controllers/userController');

router.post("/create-user",createUser );
router.post("/login-user", login);
router.get("/sign-out", signOut);
router.get("/isAuth", isAuth );


module.exports = router;