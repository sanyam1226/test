const express = require('express');
const router = express.Router();
const Auth = require('../middleware/Auth');

const auth_controller = require('../controllers/backend/AuthController');
router.post('/login', auth_controller.Login);
router.post('/signup', auth_controller.Signup);
router.get('/profile', Auth.login, auth_controller.Profile);
router.post('/update_profile', Auth.login, auth_controller.UpdateProfile);

module.exports = router;