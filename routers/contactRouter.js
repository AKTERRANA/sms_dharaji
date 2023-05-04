const express = require("express");
const {auth} = require("../auth/auth");
const ContactController = require("../controllers/contactController")
const router = express.Router();
router.route("/create-new").post(auth,  ContactController.create);
router.route("/all").get(ContactController.getAll);
router.route("/update/:id").patch(auth, ContactController.edit)

module.exports = router;