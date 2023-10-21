let productController = module.exports;

productController.getAllProducts = async (req, res) => {
  try {
    console.log("ERROR: cont/getAllProducts", err);
  } catch (err) {
    console.log("ERROR: cont/getAllProducts", err);
    res.json({ state: "fail", message: err.message });
  }
};

productController.addNewProduct = async (req, res) => {
  try {
    console.log("POST: cont/addNewProduct", err);
    console.log(req.member);
  } catch (err) {
    console.log("ERROR: cont/addNewProduct", err);
  }
};

productController.updateChosenProduct = async (req, res) => {
  try {
    console.log("POST: cont/updateChosenProduct");
  } catch (err) {
    console.log(`ERROR: cont/updateChosenProduct, ${err.message}`);
  }
};
