const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Show register page
exports.getRegister = (req, res) => {
  res.render("register");
};

// Handle register
exports.postRegister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    res.redirect("/login");
  } catch (err) {
    res.send("Error: " + err.message);
  }
};

// Show login page
exports.getLogin = (req, res) => {
  res.render("login");
};

// Handle login
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send("Invalid credentials");

  req.session.user = user;
  res.redirect("/dashboard");
};

// Show dashboard
exports.getDashboard = (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  res.render("dashboard", { user: req.session.user });
};

// Handle logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

