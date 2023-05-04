const express = require("express");
const {auth} = require("../auth/auth");
const router = express.Router();
const gallleryController = require("../controllers/galleryController");

router.route("/create-new").post(auth, gallleryController.create);
router.route("/all").get(gallleryController.getAll);
router.route("/delete/:id").get(auth, gallleryController.delete)

module.exports = router;