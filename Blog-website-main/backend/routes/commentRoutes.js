const express = require('express');
const { addComment, fetchComment, addReply } = require('../controllers/commentControllers');

const router = express.Router();

router.post('/add',addComment);
router.post('/fetch',fetchComment);
router.post('/reply',addReply);

module.exports = router;