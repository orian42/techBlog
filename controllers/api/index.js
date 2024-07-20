const router = require('express').Router();

const userRoutes = require('./user-routes');
const contentRoutes = require('./content-routes');

router.use('/users', userRoutes);
router.use('/content', contentRoutes);

module.exports = router;