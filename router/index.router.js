const express = require("express");
const router = express.Router();

const imageRoute = require("./image.router");


router.use("/images", imageRoute);




module.exports = router;
