const express = require("express");
const router = express.Router();
const InfraController = require("../controllers/infraController");
const {auth} = require("../auth/auth");


router.route("/create-new").post(auth, InfraController.create);
router.route("/all").get(InfraController.getAll);
router.route("/delete/:id").get(auth, InfraController.delete)
router.route("/update/:id").patch(auth, InfraController.edit)

module.exports = router;