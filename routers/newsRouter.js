const express = require("express");
const router = express.Router();
const NewsController = require("../controllers/newsController");
const {auth} = require("../auth/auth");

router.route("/create-new").post(auth, NewsController.create);
router.route("/all").get(NewsController.getAll);
router.route("/delete/:id").get(auth, NewsController.delete)
router.route("/update/:id").patch(auth, NewsController.edit)

module.exports = router;