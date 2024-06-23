const express = require("express");
const CompModel = require("../models/CompModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

function issign(req, res, next) {
  if (req.cookies["token"]) {
    const user = jwt.verify(req.cookies["token"], "alpha");
    req.user = user.user;
    next();
  } else {
    res.render("input");
  }
}

router.get("/data", issign, async (req, res) => {
  const data = await CompModel.find();
  const nme = await UserModel.find();
  res.render("weekas", { data, nme });
});

router.get("/create", issign, (req, res) => {
  res.render("create");
});

router.post("/create", issign, async (req, res) => {
  const { number, title, desc, githublink } = req.body;
  const data = await CompModel.create({
    userid: req.user.userid,
    wno: number,
    title,
    desc,
    githublink,
  });
  res.render('success');
});

router.get("/", issign, (req, res) => {
  res.render("dashboard", { username: req.user.username });
});

module.exports = router;
