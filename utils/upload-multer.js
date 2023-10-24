const path = require("path");
const multer = require("multer");
const uuid = require("uuid");

// MULTER IMAGE UPLOADRE
function getTargetImageStorage(adress) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${adress}`);
    },
    filename: function (req, file, cb) {
      console.log(file);
      const extension = path.parse(file.originalname).ext;
      const random_name = uuid.v4() + extension;
      cb(null, random_name);
    },
  });
}

const makeUploader = (adress) => {
  const storage = getTargetImageStorage(adress);
  return multer({ storage: storage });
};

module.exports = makeUploader;

// const product_storage = multer.diskStorage({
//   destination: function (req, filecb) {
//     cb(null, "./uploads/products");
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     const extension = path.parse(file.originalname).ext;
//     const rendom_name = uuid.v4() + extension;
//     cb(null, rendom_name);
//   },
// });
// module.exports.uploadProductImage = multer({ storage: product_storage });
