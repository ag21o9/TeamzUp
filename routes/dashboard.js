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

router.get("/data/:i", issign, async (req, res) => {
  const data = await CompModel.find({wno:req.params.i});
  const nme = await UserModel.find();
  res.render("weekas", { data, nme });
});

router.get("/create", issign, (req, res) => {
  res.render("create");
});

router.post("/create", issign, async (req, res) => {
  const { number, title, desc, githublink } = req.body;

  const exist = await CompModel.findOne({ userid: req.user.userid });
  if (exist && number == exist.wno) {
    res.send("already participated this week");
  } else {
    const data = await CompModel.create({
      userid: req.user.userid,
      wno: number,
      title,
      desc,
      githublink,
    });
    res.render("success");
  }
});

router.get("/", issign, (req, res) => {
  res.render("dashboard", {wno:1});
});

module.exports = router;
