const router = require('express').Router();
const authController = require("../controllers/auth-controller")
const auth = require("../middleware/auth-middleware")

router.post('/login', authController.login);

router.post('/refresh-token', authController.refreshToken);

router.post('/logout', auth, authController.logout);

router.get('/users', auth, authController.allUsers);

module.exports = router;

