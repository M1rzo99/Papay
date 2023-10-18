const express = require("express");
const router = express.Router();
const memberControllers = require("./controllers/memberControllers");

// memberga dahldor routers
console.log("Routera");
router.get("/", memberControllers.home);
router.post("/signup", memberControllers.signup);
router.post("/login", memberControllers.login);
router.get("/logout", memberControllers.logout);

// others routers
router.get("/menu", function (req, res) {
    res.send("You are in Page Menu")
});

// others routers
router.get("/community", function (req, res) {
    res.send("You are in community Page")
});

module.exports = router;