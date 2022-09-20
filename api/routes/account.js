const router = require('express').Router();
const AccountReviews = require('./account.reviews')
router.use('/reviews', AccountReviews);


module.exports = router;
