const express = require("express");
const songRouter = express.Router();

const {
  allsongsfinder,
  singlesongfinder,
} = require("../controllers/song-controller");
const { authenticate } = require("../Middleware/User-Middleware");

songRouter.get("/", authenticate, allsongsfinder);
songRouter.get("/:fileName", singlesongfinder);

module.exports = songRouter;
