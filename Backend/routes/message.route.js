const router = require('express').Router();

const { getUsersController, getMessagesController, sendMessageController } = require('../controllers/message.controller');
const authMiddleare = require('../middlewares/auth.middleware');


router.get('/users', authMiddleare, getUsersController);
router.get('/:id', authMiddleare, getMessagesController);
router.post('/send/:id', authMiddleare, sendMessageController);


module.exports = router;