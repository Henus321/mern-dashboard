const express = require("express");
const { protect } = require("../controllers/authController");
const {
  getAllProducts,
  getProductsByBrand,
} = require("../controllers/productController");

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.route("/").get(getAllProducts);
router.route("/:brand").get(getProductsByBrand);

module.exports = router;
