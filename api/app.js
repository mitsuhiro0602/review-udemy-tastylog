const PORT = process.env.PORT || 3000;
const path = require("path");
const logger = require("./lib/log/logger.js");
const accesslogger = require("./lib/log/accesslogger.js");
const applicationlogger = require("./lib/log/applicationlogger.js");
const express = require("express");
const favicon = require("serve-favicon");
const app = express();

// Express settings
app.set("view engine", "ejs");
app.disable("x-powered-by");

// Static resource rooting.
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "/public")));

// Set access log.
app.use(accesslogger());

// Dynamic resource rooting.
app.use("/", require("./routes/index.js"));

// testを出力する
app.use("/test", async (req, res, next) => {
  // promisifyは非同期化するためのメソッド
  const { MySQLClient, sql } = require('./lib/database/client')

  let data;
  try {
    await MySQLClient.connect();
    data = await MySQLClient.query(await sql("SELECT_SHOP_BASIC_BY_ID"));
    console.log(data);

  } catch (err){
    next(err)
    console.log('成功しmさいた')
  }
  res.end('OK');
});

// Set application log.
app.use(applicationlogger());

// Execute web application.
app.listen(PORT, () => {
  logger.application.info(`Application listening at :${PORT}`);
});
