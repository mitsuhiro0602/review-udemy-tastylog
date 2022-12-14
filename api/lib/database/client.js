// const { promisify } = require('util');
const path = require("path");
const { sql } = require('@garafu/mysql-fileloader')({root: path.join(__dirname, "./sql")});
const pool = require('./pool')
const Transaction = require('./transaction');

const MySQLClient = {
	executeQuery: async function(query, values) {
		let results = await pool.executeQuery(query, values);
		return results
	},
	beginTransaction: async function () {
		let tran = new Transaction();
		await tran.begin();
		return tran;
	}
};
// const config = require('../../config/mysql.config.js')
// const mysql = require('mysql2');
// const con = mysql.createConnection({
// 	host: 'db',
// 	port: config.PORT,
// 	user: config.USERNAME,
// 	password: config.PASSWORD,
// 	database: config.DATABASE
// });
//
// const MySQLClient = {
// 	connect: promisify(con.connect).bind(con),
// 	query: promisify(con.query).bind(con),
// 	end: promisify(con.end).bind(con)
// };

module.exports = {
	MySQLClient,
	sql
}
