const express = require("express");
const router = express.Router();
const productsController = require("../handlers/products.handler");

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);
router.post("/", productsController.createProduct);
router.delete("/:id", productsController.deleteProduct);
module.exports = router;
