const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const path=require('path');
require("dotenv").config();

const app = express();
connectDB();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "campusconnectsecret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
     cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);





// Routes
app.use("/", authRoutes);

// Home redirect
// app.get("/", (req, res) => res.redirect("/landing"));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 5000}`);
});
