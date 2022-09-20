const router = require('express').Router();
const { MySQLClient, sql } = require('../lib/database/client')
router.get("/regist/:shopId(\\d+)", async (req,res, next) => {
	let shopId = req.params.shopId;
	let shop, shopName, review, results;

	try {
		results = await MySQLClient.executeQuery(
			await sql("SELECT_SHOP_BASIC_BY_ID"),
			[shopId]
		);
		shop = results[0] || {};
		shopName = shop.name;
		review = {};
		res.render("./account/reviews/regist-form.ejs", { shopId, shopName, review })
	} catch (err) {
		next(err);
	}
})

module.exports = router;
