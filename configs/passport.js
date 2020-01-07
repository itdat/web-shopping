var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var usersModel = require("../models/user");
const brcypt = require("bcryptjs");

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(async function(email, done) {
  const result = await usersModel.findUser(email);
  if (result.status === false && result.message === "Không tìm thấy email") {
    done(new Error("Email không tồn tại"));
  } else {
    if (result.message === "Tài khoản đã bị khóa") {
      done(new Error("Tài khoản đã bị khóa"));
    } else {
      return done(null, result.data);
    }
  }
});

//Passport register
passport.use(
  "local.register",
  new LocalStrategy(
    {
      usernameField: "email",
      passswordField: "password",
      passReqToCallback: true
    },
    async function(req, email, password, done) {
      console.log(req.body);
      const result = await usersModel.findUser(email);

      if (
        result.status === true ||
        (result.status === false && result.message === "Tài khoản đã bị khóa")
      ) {
        return done(null, false, {
          message: "Email đã được sử dụng, vui lòng chọn email khác"
        });
      } else {
        if (password.length <= 6) {
          return done(null, false, {
            message: "Mật khẩu phải lớn hơn 6 ký tự"
          });
        } else {
          const newUser = await usersModel.createNewUser(
            email,
            password,
            req.body.phone,
            req.body.fullname
          );
          return done(null, newUser);
        }
      }
    }
  )
);

passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    async function(req, email, password, done) {
      const result = await usersModel.findUser(email);
      if (result.status === true) {
        if (brcypt.compareSync(password, result.data.password)) {
          return done(null, result.data);
        } else {
          return done(null, false, {
            message: "Sai mật khẩu, vui lòng nhập lại"
          });
        }
      } else {
        if (result.message === "Không tìm thấy email") {
          return done(null, false, {
            message: "Email không tồn tại, vui lòng nhập lại"
          });
        } else {
          return done(null, false, {
            message: "Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên"
          });
        }
      }
    }
  )
);
