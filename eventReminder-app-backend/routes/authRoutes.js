const express = require('express');
const authController = require('../controllers/authController.js');
const { validateRequest } = require('../middleware/validation.js');
const { signupSchema, loginSchema } = require('../utils/validators.js');
const {auth} = require('../middleware/auth.js');

const router = express.Router();

router.post('/signup', validateRequest(signupSchema), authController.signup);
router.post('/login', validateRequest(loginSchema), authController.login);
router.get('/me', auth, authController.getMe);

module.exports = router;
