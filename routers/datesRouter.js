const express = require("express");
const router = express.Router();
const DatesController = require("../controllers/datesController");
const {auth} = require("../auth/auth");

router.route("/create-new").post(auth, DatesController.create);
router.route("/all").get(DatesController.getAll);
router.route("/delete/:id").get(auth,DatesController.delete)
router.route("/update/:id").patch(auth,DatesController.edit)
module.exports = router;