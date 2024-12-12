import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
    singleProduct,
    getAllProducts,
    getAllCategories,
    getAllBrands,
    addProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

// all of brand, category and search by products with query
router.route("/").get(getAllProducts);
router.route("/categories").get(getAllCategories);
router.route("/brands").get(getAllBrands);
router.route("/id/:productId").get(singleProduct);

router.route("/user/add").post(
    verifyJWT,
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "images", maxCount: 4 },
    ]),
    addProduct
);
router.route("/user/:productId").patch(
    verifyJWT,
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "images", maxCount: 4 },
    ]),
    updateProduct
);
router.route("/user/:productId").delete(verifyJWT, deleteProduct);

export default router;
