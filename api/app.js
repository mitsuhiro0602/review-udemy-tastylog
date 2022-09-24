const appconfig = require('./config/application.config.js');
const dbconfig = require('./config/mysql.config.js');
const path = require("path");
const logger = require("./lib/log/logger.js");
const accesslogger = require("./lib/log/accesslogger.js");
const applicationlogger = require("./lib/log/applicationlogger.js");
const express = require("express");
const favicon = require("serve-favicon");
const cookie = require('cookie-parser');
const session = require('express-session')
const MySQLStore = require("express-mysql-session")(session);
const app = express();
const mysql2 = require('mysql2/promise');

const shopRouter = require('./routes/shop');
const searchRouter = require('./routes/search')
const AccountRouter = require('./routes/account')

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
const mysqlOptions = {
  host: 'db',
  port: dbconfig.PORT,
  user: dbconfig.USERNAME,
  password: dbconfig.PASSWORD,
  database: dbconfig.DATABASE
};

const connection = mysql2.createPool(mysqlOptions);
const mysqlSessionStore = new MySQLStore({}, connection);

// Set middleware
app.use(cookie());
app.use(
  session({
  // store: new MySqlStore({
  //   host: 'db',
  //   port: dbconfig.PORT,
  //   user: dbconfig.USERNAME,
  //   password: dbconfig.PASSWORD,
  //   database: dbconfig.DATABASE
  // }),
  store: mysqlSessionStore,
  secret: appconfig.security.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  name: "sid"
}));
// Set middleware
// formの内容を読むことができるもの。
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   console.log(req.cookies.message);
//   res.cookie("message", "Hello world")
//  next();
// })
// Dynamic resource rooting.
// testのトランザクションをテストする


app.get("/test", async (req, res, next) => {
  const { MySQLClient } = require("./lib/database/client");
  let tran;
  try {
    tran = await MySQLClient.beginTransaction();
    await tran.executeQuery(
      "UPDATE t_shop SET score=? WHERE id=?",
      [4.00, 1]
    );
    // throw new Error('Test exception')
    await tran.commit();
    res.end('OK')
  } catch (err) {
    await tran.rollback()
    next(err);
  }
});

app.use("/", require("./routes/index.js"));

// shopを出力する
app.use("/shops", shopRouter);
app.use('/search', searchRouter);
app.use('/account', AccountRouter)
// Set application log.
app.use(applicationlogger());

// Execute web application.
app.listen(appconfig.PORT, () => {
  logger.application.info(`Application listening at :${appconfig.PORT}`);
});
