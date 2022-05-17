const express = require('express');
const router = express.Router();

const upload = require('../../middlewares/productMulterMdlw.js');
const productController = require('../../controllers/api/products.js');

router.get("/", productController.index);

router.post("/create", upload.single("image"), productController.store);

router.put("/edit", upload.single("image"), productController.update);

router.delete("/delete", productController.delete);

router.get("/:id", productController.detail);

module.exports = router;