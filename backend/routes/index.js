const express = require("express");
const bookrouter = require("./book");


const router = express.router();
router.use("/book",bookrouter);

model.exports = router;