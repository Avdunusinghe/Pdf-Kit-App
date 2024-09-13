const express = require("express");
const router = express.Router();

const { generatePdf } = require("../api/pdf.manager.api");

router.get("/", generatePdf);

module.exports = router;
