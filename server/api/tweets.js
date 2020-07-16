const express = require('express');
const router = express.Router();
const tweetsController = require('../controllers/tweet.controller');
const auth = require('../middlewares/auth');

router.post('/create', auth, async (req, res) => {
  await tweetsController.create(req, res);
});

router.get('/get', auth, async (req, res) => {
  await tweetsController.get(req, res);
});

module.exports = router;