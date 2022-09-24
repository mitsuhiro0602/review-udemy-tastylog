const router = require('express').Router();
const AccountReviews = require('./account.reviews')

router.get('/login', (req, res, next) => {
	res.render('./account/login.ejs');
})
router.use('/reviews', AccountReviews);


module.exports = router;
