const express = require("express");
const bcrypt = require("bcryptjs");
const validator = require('validator');
const router = express.Router();

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

router.post('/', (req, res) => {
  const { username, email, password } = req.body;
  
  if (!validator.isAlphanumeric(username)) {
    res.status(400).send('Username must be alphanumeric.');
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).send('Email address is not valid.');
    return;
  }

  // if (!validator.checkPasswordStrength(password)) {
  //   res.status(400).send('Password is not secure.');
  //   return;
  // }

  res.status(200).send('nice');
});

module.exports = router;