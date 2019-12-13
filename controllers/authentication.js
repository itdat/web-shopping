module.exports.isUnauthenticated = (req, res, next) => {
  if (req.isUnauthenticated()) return next();
  else res.redirect("/");
};

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  else res.redirect("back");
};

module.exports.getStateAuthenticated = (req, res, next) => {
  res.locals.user = req.user;
  res.locals.authenticated = req.isAuthenticated();
  console.log(res.locals);
  next();
};
