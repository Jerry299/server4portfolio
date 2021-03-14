const express = require("express");
const messageRouter = express.Router();
const MessageCtrl = require("../controllers/MessageCtrl");

messageRouter.get("/", MessageCtrl.getHome);
messageRouter.post("/messages", MessageCtrl.postMessage);

module.exports = messageRouter;
