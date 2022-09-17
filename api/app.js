const PORT = process.env.PORT || 3000;
const path = require("path");
const logger = require("./lib/log/logger.js");
const accesslogger = require("./lib/log/accesslogger.js");
const applicationlogger = require("./lib/log/applicationlogger.js");
const express = require("express");
const favicon = require("serve-favicon");
const app = express();

const shopRouter = require('./routes/shop');
const searchRouter = require('./routes/search')

// Express settings
app.set("view engine", "ejs");
app.disable("x-powered-by");



// localsでデータが消えずに保存される
app.use((req, res, next) => {
  res.locals.moment = require("moment");
  res.locals.padding = require("./lib/math/math").padding;
  next();
});

// Static resource rooting.
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "/public")));

// Set access log.
app.use(accesslogger());

// Dynamic resource rooting.
app.use("/", require("./routes/index.js"));

// testを出力する
// app.use("/test", async (req, res, next) => {
//   // promisifyは非同期化するためのメソッド
//   const { MySQLClient, sql } = require('./lib/database/client')
//
//   let data;
//   try {
//     data = await MySQLClient.executeQuery(await sql("SELECT_SHOP_BASIC_BY_ID"), [1]);
//     // data = await MySQLClient.query(await sql("SELECT_SHOP_BASIC_BY_ID"), [1]);
//     console.log(data);
//     console.log('接続に成功しました')
//   } catch (err){
//     next(err)
//   }
//   res.end('OK');
// });

// shopを出力する
app.use("/shops", shopRouter);
app.use('/search', searchRouter);

// Set application log.
app.use(applicationlogger());

// Execute web application.
app.listen(PORT, () => {
  logger.application.info(`Application listening at :${PORT}`);
});
