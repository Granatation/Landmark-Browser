const router = require('express').Router();

const landmarkController = require('./controllers/landmarkController');
const userController = require('./controllers/userController');

router.use(userController);
router.use(landmarkController);

module.exports = router;