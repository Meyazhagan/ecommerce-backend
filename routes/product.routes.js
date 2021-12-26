const router = require("express").Router();

const { validateBody, type } = require("../helper/joiSchema");
const authUser = require("../middleware/authUser");
const { SELLER } = require("../model/role");
const authorize = require("../permissions/authorize");
const createProduct = require("../services/product/createProduct");
const deleteProduct = require("../services/product/deleteProduct");
const getAllProducts = require("../services/product/getAllProducts");
const getAllSellerProducts = require("../services/product/getAllSellerProducts");
const getById = require("../services/product/getById");
const initProducts = require("../services/product/initProducts");
const updateProduct = require("../services/product/updateProduct");

router.get("/", getAllProducts);
router.get("/:id", getById);

router.get("/seller", authUser, authorize([SELLER]), getAllSellerProducts);

router.post("/init", authUser, authorize([SELLER]), initProducts);
router.post("/", authUser, authorize([SELLER]), validateBody(type.PRODUCT), createProduct);
router.put("/:id", authUser, authorize([SELLER]), validateBody(type.PRODUCT), updateProduct);
router.delete("/:id", authUser, authorize([SELLER]), deleteProduct);

module.exports = router;
