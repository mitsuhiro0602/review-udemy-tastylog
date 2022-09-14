module.exports = {
	HOST: process.env.MYSQL_HOST || "127.0.0.1",
	PORT: process.env.MYSQL_PORT || "3306",
	USERNAME: process.env.MYSQL_USERNAME || "username",
	PASSWORD: process.env.MYSQL_PASSWORD || "mypassword",
	DATABASE: process.env.MYSQL_DATABASE || "tastylog"
}
