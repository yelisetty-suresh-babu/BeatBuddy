const express = require("express");
const songRouter = express.Router();


const {
  allsongsfinder,
  singlesongfinder,
} = require("../controllers/song-controller");

songRouter.get("/", allsongsfinder);
songRouter.get("/:fileName", singlesongfinder);

module.exports = songRouter;
