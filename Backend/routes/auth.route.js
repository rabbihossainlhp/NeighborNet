const  router = require('express').Router();
const { loginController, signupController, logoutController} = require('../controllers/auth.controller');
const authMiddleare = require('../middlewares/auth.middleware');

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/logout', authMiddleare, logoutController);



module.exports = router;    