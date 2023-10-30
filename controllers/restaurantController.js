// const { read } = require("mongodb/lib/gridfs/grid_store");
const Member = require("../models/Member");
const Product = require("../models/Product");

const restaurantController = module.exports;

restaurantController.home = (req, res) => {
  try {
    console.log("Get: cont/Home");
    res.render("home-page");
  } catch (err) {
    console.log("ERROR: cont/home", err);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getMyRestauranProducts = async (req, res) => {
  try {
    console.log("GET: cont/getMyRestauranProducts");
    // TODO:Get my restaurent products
    const product = new Product();
    const data = await product.getaAllProductsDataResto(res.locals.member);
    res.render("restaurant-menu", { restaurant_data: data });
  } catch (err) {
    console.log("ERROR: cont/getMyRestauranProducts", err);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getSignupMyRestaurant = async (req, res) => {
  try {
    console.log("GET: cont/getSignupMyRestaurant");
    res.render("signup");
  } catch (err) {
    console.log("ERROR: cont/getSignupMyRestaurant", err);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.signupProcess = async (req, res) => {
  try {
    console.log("POST: const/signupProcess");
    const data = req.body,
      member = new Member(),
      new_member = await member.signupData(data);

    //SESSION
    req.session.member = new_member;
    res.redirect("/resto/products/menu");
  } catch (err) {
    console.log(`ERROR: cont/signupProcess, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getLoginMyRestaurant = async (req, res) => {
  try {
    console.log("GET: cont/getLoginMyRestaurant");
    res.render("login-page");
  } catch (err) {
    console.log(`ERROR, cont/getLoginMyRestaurant, ${err.message} `);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.loginProcess = async (req, res) => {
  try {
    console.log("POST: const/loginProcess");
    const data = req.body,
      member = new Member(),
      result = await member.loginData(data);

    req.session.member = result;
    req.session.save(function () {
      result.mb_type === "ADMIN"
        ? res.redirect("/resto/all-restaurant")
        : res.redirect("/resto/products/menu");
    });
  } catch (err) {
    console.log(`ERROR: cont/loginProcess, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.logout = (req, res) => {
  console.log("GET: cont/logout");
  req.send("You are loged out");
};

restaurantController.validateAuthRestaurant = (req, res, next) => {
  console.log(req.session.member);
  if (req.session?.member?.mb_type === "RESTAURANT") {
    req.member = req.session.member;
    next();
  } else
    res.json({
      state: "failed",
      message:
        "Membelarni taypi restorant bolgan userlarni keyingi bolimga otkaz",
    });
};

restaurantController.checkSessions = (req, res) => {
  console.log(req.session?.member);
  if (req.session?.member) {
    res.json({ state: "succeed", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "You are not authintification" });
  }
};
