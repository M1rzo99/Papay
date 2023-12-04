const express = require("express");
const app = express();
const router = require("./router.js");
const router_BSSR = require("./router_BSSR.js");
const cookieParser = require("cookie-parser");

// For session
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: "sessions", // ozgartridim 2023/10/22
});

//1Kirish code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//2 Session code
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 30 },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  res.locals.member = req.session.member;
  next();
});

//3 Views code
app.set("views", "views");
app.set("view engine", "ejs");

//Routing code
app.use("/resto", router_BSSR);
app.use("/", router);

module.exports = app;
