var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var passport = require("passport");
var bodyParser = require("body-parser");
var flash = require("connect-flash");

require("./configs/passport");

app.use(
  session({
    secret: "secured_key",
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Require routing
const routing = require("./routing");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

var hbs = require("hbs");
hbs.registerPartials(__dirname + "/views/partials");

require("./helper");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const { getStateAuthenticated } = require("./controllers/authentication");

// Routing
app.use("/", getStateAuthenticated, routing);

app.use(function(req, res, next) {
  res.status(404);
  res.render("error", {
    code: 404,
    title: "Không tìm thấy trang",
    details: "Trang bạn yêu cầu hiện không còn khả dụng!"
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", {
    code: 500,
    title: "Lỗi truy xuất dữ liệu",
    details: "Có lỗi xảy ra ở server nên tạm thời yêu cầu không được phản hồi!"
  });
});

module.exports = app;
