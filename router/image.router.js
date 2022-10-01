
const express = require("express");
const router = express.Router();

const image = require("../controller/image.controller");


router.post("/", image.uploadImage);
router.get("/", image.getImage);




module.exports = router;
