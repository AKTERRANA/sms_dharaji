const express = require("express");
const {auth} = require("../auth/auth");
const aboutController = require("../controllers/aboutController")
const router = express.Router();
router.route("/create-new").post(auth, aboutController.create);
router.route("/all").get(aboutController.getAll);
router.route("/update/:id").patch(auth, aboutController.edit)

module.exports = router;