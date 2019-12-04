var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var usersModel = require("../models/users");
const brcypt = require("bcryptjs");

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(async function(email, done) {
  const user = await usersModel.findUser(email);
  if (!user) {
    done(new Error("Email không tồn tại"));
  } else return done(null, user);
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
      const user = await usersModel.findUser(email);

      if (user) {
        return done(null, false, {
          message: "Email đã được sử dụng, vui lòng chọn email khác"
        });
      } else {
        if (password.length <= 6) {
          return done(null, false, {
            message: "Mật khẩu phải lớn hơn 6 ký tự"
          });
        } else {
          const newUser = await usersModel.createNewUser(email, password);
          console.log(newUser);
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
      const user = await usersModel.findUser(email);
      if (!user) {
        return done(null, false, {
          message: "Email không tồn tại, vui lòng nhập lại"
        });
      } else {
        if (brcypt.compareSync(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Sai mật khẩu, vui lòng nhập lại"
          });
        }
      }
    }
  )
);
