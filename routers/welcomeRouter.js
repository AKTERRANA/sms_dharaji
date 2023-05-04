const express = require("express");
const {auth} = require("../auth/auth");
const router = express.Router();
const welcomeController = require("../controllers/welcomeController");

router.route("/create-new").post(auth, welcomeController.create);
router.route("/all").get(welcomeController.getAll);
router.route("/update/:id").patch(auth, welcomeController.edit)

module.exports = router;