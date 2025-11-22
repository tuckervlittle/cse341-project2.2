const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/movies', require('./movies'));
router.use('/genres', require('./genres'));

module.exports = router;