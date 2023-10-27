const express = require("express");
const router_bssr = express.Router();
const restaurantController = require("./controllers/restaurantController");
const productController = require("./controllers/productController");
const uploader_product = require("./utils/upload-multer")("products");

/*************************
 *         BSSR EJS      *
 *************************/
// bu router_bssr restoron va adminlar uchundir.

router_bssr.get("/", restaurantController.home);

//Member Controller
router_bssr
  .get("/sign-up", restaurantController.getSignupMyRestaurant)
  .post("/sign-up", restaurantController.signupProcess);

router_bssr
  .get("/login", restaurantController.getLoginMyRestaurant)
  .post("/login", restaurantController.loginProcess);

router_bssr.get("/logout", restaurantController.logout);
router_bssr.get("/check-me", restaurantController.checkSessions);

// bu uchta Api productlarga tegishlidir.
router_bssr.get("/products/menu", restaurantController.getMyRestauranProducts);
router_bssr.post(
  "/products/create",
  restaurantController.validateAuthRestaurant,
  uploader_product.array("product_images", 5),
  productController.addNewProduct
);
router_bssr.post(
  "/products/edit/:id",
  restaurantController.validateAuthRestaurant,
  productController.updateChosenProduct
);
module.exports = router_bssr;
