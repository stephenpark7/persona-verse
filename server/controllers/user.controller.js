const db = require('../models');
const User = db.User;
const bcrypt = require("bcryptjs");
const validator = require('validator');

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || 'secret';
// const Op = db.Sequelize.Op;

// Create a new account
exports.create = async (req, res) => {
  const { username, email, password } = req.body;

  // Check for missing fields
  if (!username || !email || !password) {
    res.status(200).json({ error: 'Missing field(s)' });
    return;
  }

  // Username validation
  if (!validator.isAlphanumeric(username)) {
    res.status(200).json({ error: 'Username must contain only alphanumeric characters.' });
    return;
  }

  // Email validation
  if (!validator.isEmail(email)) {
    res.status(200).json({ error: 'Invalid email address.' });
    return;
  }

  // Check if username already in use
  const userData = await User.findOne({ where: { username: username } });
  if (userData !== null) {
    res.status(200).json({ error: 'Username already in use.' });
    return;
  }

  // Encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user to database
  User.create({
    username: username,
    email: email,
    password: hashedPassword,
    displayName: username
  }).then(() => {
    res.status(200).json({ message: 'Account created.' })
  }).catch(() => {
    res.status(200).json({ error: 'Error creating account.' });
  });
}

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Check for missing fields
  if (!username || !password) {
    res.status(400).send('Missing field(s)');
    return;
  }

  // Get user data
  const userData = await User.findOne({ where: { username: username } });
  if (userData === null) {
    res.status(400).send('Username does not exist.');
    return;
  }

  // Check password
  if (await bcrypt.compare(password, userData.password)) {
    const token = jwt.sign({ id: userData.id }, jwtSecret, {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).send({
      id: userData.id,
      username: username,
      accessToken: token
    });
  } else {
    res.status(400).send('Incorrect password.');
  }
}
