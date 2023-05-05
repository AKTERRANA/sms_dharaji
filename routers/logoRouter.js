const express = require("express");
const {auth} = require("../auth/auth");
const router = express.Router();
const logoController = require("../controllers/logoController");

router.route("/create-new").post(auth, logoController.create);
router.route("/all").get(logoController.getLogo);
router.route("/update/:id").patch(auth, logoController.update)

module.exports = router;