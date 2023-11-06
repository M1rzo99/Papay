// const { read } = require("mongodb/lib/gridfs/grid_store");
const assert = require("assert");
const Member = require("../models/Member");
const Product = require("../models/Product");
const Definer = require("../lib/mistakes");

const restaurantController = module.exports;

// home page un hizmat qiladi. sucess bo'lsa try ni, error bo'lsa catch ni  qaytarib beradi
restaurantController.home = (req, res) => {
  try {
    console.log("Get: cont/Home");
    res.render("home-page");
  } catch (err) {
    console.log("ERROR: cont/home", err);
    res.json({ state: "fail", message: err.message });
  }
};

//
restaurantController.getMyRestauranProducts = async (req, res) => {
  try {
    console.log("GET: cont/getMyRestauranProducts");
    // TODO:Get my restaurent products
    const product = new Product();
    const data = await product.getaAllProductsDataResto(res.locals.member);
    res.render("restaurant-menu", { restaurant_data: data });
  } catch (err) {
    console.log("ERROR: cont/getMyRestauranProducts", err);
    res.redirect("/resto");
  }
};

// signUp qilish un hizmat qiladi.signUp to'g'ri bo'lsa try, to'g'ri bo'lmasa catch ni qaytarib beradi.
restaurantController.getSignupMyRestaurant = async (req, res) => {
  try {
    console.log("GET: cont/getSignupMyRestaurant");
    res.render("signup");
  } catch (err) {
    console.log("ERROR: cont/getSignupMyRestaurant", err);
    res.json({ state: "fail", message: err.message });
  }
};

// SignUp qilganda ishlaydi. sucess bo'lsa resto/products/menu pageiga o'tkazadi.
restaurantController.signupProcess = async (req, res) => {
  try {
    console.log("POST: Cont/signupProcess");

    assert(req.file, Definer.general_err3);

    let new_member = req.body;
    new_member.mb_type = "RESTAURANT";
    new_member.mb_image = req.file.path;

    const member = new Member();
    const result = await member.signupData(new_member);
    assert(result, Definer.general_err1);
    //SESSION
    req.session.member = result;
    res.redirect("/resto/products/menu");
  } catch (err) {
    console.log(`ERROR: Cont/signupProcess, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

// getLoginMyRestaurant API si login bolganda, login-page ga o'tkazib beradi.
restaurantController.getLoginMyRestaurant = async (req, res) => {
  try {
    console.log("GET: cont/getLoginMyRestaurant");
    res.render("login-page");
  } catch (err) {
    console.log(`ERROR, cont/getLoginMyRestaurant, ${err.message} `);
    res.json({ state: "fail", message: err.message });
  }
};

// loginProcess da login qilgan userni datasini mb_typei admin bo'lsa all-restaurant page iga o'tkazadi,bo'lmasa products-menu ga o'tkazadi.
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
  try {
    req.session.destroy(function () {
      res.redirect("/resto");
    });
  } catch (err) {
    console.log(`ERROR: cont/logout, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

// validateAuthRestaurant da SignUp qilganda mb_typei restaurant bo'lsa keyini jarayonga o'tkazadi.
restaurantController.validateAuthRestaurant = (req, res, next) => {
  if (req.session?.member?.mb_type === "RESTAURANT") {
    req.member = req.session.member;
    next();
  } else
    res.json({
      state: "failed",
      message: "Membelarni taypi 'RESTAURANT' bo'lmagan user",
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

restaurantController.validateAdmin = (req, res, next) => {
  if (req.session?.member?.mb_type === "ADMIN") {
    req.member = req.session.member;
    next();
  } else {
    const html = `<script> 
    alert ('Admin Page: Permission denied!');
    window.location.replace('/resto');
    </script>`;
    res.end(html);
  }
};

restaurantController.getAllRestaurants = (req, res) => {
  try {
    console.log("GET cont/getAllRestaurants");
    // ToDo: hamma restaurantlarni DataBase dan chaqiramiz
    res.render("all-restaurants");
  } catch (err) {
    console.log(`ERROR: cont/getAllRestaurants, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
