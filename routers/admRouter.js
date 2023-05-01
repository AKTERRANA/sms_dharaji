const express = require("express");
const {auth} = require("../auth/auth");
const router = express.Router();
const AdmController = require("../controllers/admController");

router.route("/create-new").post(auth, AdmController.create);
router.route("/all").get(AdmController.getAll);
router.route("/delete/:id").get(auth, AdmController.delete)
router.route("/update/:id").patch(auth, AdmController.edit)

module.exports = router;