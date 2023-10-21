const router_bssr = require("express").Router();
const productController = require("./controllers/productController");
const restaurantController = require("./controllers/restaurantController");

/*************************
 *         BSSR EJS      *
 *************************/
// bu router_bssr restoron va adminlar uchundir.

//Member Controller
router_bssr
  .get("/signup", restaurantController.getSignupMyRestaurant)
  .post("/signup", restaurantController.signupProcess);

router_bssr
  .get("/login", restaurantController.getLoginMyRestaurant)
  .post("/login", restaurantController.loginProcess);

router_bssr.get("/logout", restaurantController.logout);
router_bssr.get("/check-me", restaurantController.checkSessions);

// bu uchta Api productlarga tegishlidir.
router_bssr.get("/products/menu", restaurantController.getMyRestaurantData);
router_bssr.post(
  "/products/create",
  restaurantController.validateAuthRestaurant,
  productController.addNewProduct
);
router_bssr.post("/products/edit/:id", productController.updateChosenProduct);

module.exports = router_bssr;
