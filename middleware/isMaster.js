module.exports = function (req, res, next) {
  if (req.headers["x-user-role"] !== "master") {
    return res.status(403).json({ success: false, message: "Accesso negato" });
  }
  next();
};
