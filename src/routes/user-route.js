const router = require('express').Router();
const userController = require("../controllers/user-controller")
const auth = require("../middleware/auth-middleware")



router.post('/registration', userController.register);

router.get('/get-profile/:username', auth, userController.getProfile);

router.patch("/update-profile/:username", auth,  userController.updateUser);

router.post('/checkusername', userController.checkUsername);

module.exports = router; 