const express = require("express");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const router = express.Router();

function issign(req, res, next) {
  if (req.cookies["token"]) {
    const user = jwt.verify(req.cookies["token"], "alpha");
    req.user = user.user;
    console.log(req.user);
    res.render('success');
  } else {
    next()
  }
}

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect('/');
});

router.get('/',issign,(req,res)=>{
    res.render('input');
})

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.create({
    username,
    password,
  });
  res.send(user);
});

router.post("/login", issign, async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username: username });
  console.log(username);
  console.log(password);

  if (user && user.password == password) {
    const token = jwt.sign(
      {
        user: {
          username: user.username,
          userid: user.id,
        },
      },
      "alpha"
    );
    res.cookie("token", token);
    res.render('success')
  } else {
    res.send("No user Found");
  }
});

module.exports = router;
