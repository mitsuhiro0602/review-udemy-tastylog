const roundTo = require('round-to')
const padding = (value) => {
	if(isNaN(parseFloat(value))) {
		return "-";
	}

	// 文字列で返す
	return  roundTo(value, 2).toPrecision(3);
}

const round = (value) => {
	return roundTo(value, 2)
}
module.exports = {
	padding,
	round
}
