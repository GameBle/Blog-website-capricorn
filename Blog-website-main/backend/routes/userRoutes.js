const express = require('express');
const { authUser, authByGoogle } = require('../controllers/userController');

const router = express.Router();

router.post('/login',authUser);
router.post('/loginByGoogle',authByGoogle);

module.exports = router;