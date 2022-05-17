const express = require('express');
const router = express.Router();

// const upload = require('../../middlewares/productMulterMdlw.js');

const productController = require('../../controllers/api/products.js');

router.get("/", productController.list);

// router.post("/store", upload.single("image"), productController.store);
router.post("/store", productController.store);

// router.put("/update/:id", upload.single("image"), productController.update);
router.put("/update/:id", productController.update);

router.delete("/delete/:id", productController.destroy);

router.post("/search", productController.searchByName);

router.get("/:id", productController.detail);

module.exports = router;