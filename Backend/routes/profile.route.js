const router = require('express').Router();
const authMiddleare = require('../middlewares/auth.middleware');
const {checkProfileController,updateProfileController} = require('../controllers/profile.controller');

router.post('/update', authMiddleare,updateProfileController );
router.get('/check',authMiddleare,checkProfileController );

module.exports = router;