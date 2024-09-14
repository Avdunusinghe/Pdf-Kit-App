const express = require("express");
const router = express.Router();

const { getPaginatedUsersByFilterAsync } = require("../api/user.api");

router.post("/", getPaginatedUsersByFilterAsync);

module.exports = router;
