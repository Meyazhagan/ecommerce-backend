const router = require("express").Router();
const addToCart = require("../services/cart/addToCart");
const removeFromCart = require("../services/cart/removeFromCart");
const getCartProduct = require("../services/cart/getCartProduct");
const { BUYER } = require("../model/role");
const authUser = require("../middleware/authUser");
const authorize = require("../permissions/authorize");
const { validateBody, type } = require("../helper/joiSchema");

router.get("/items", authUser, authorize([BUYER]), getCartProduct);
router.patch("/add", authUser, authorize([BUYER]), validateBody(type.ADD_CART), addToCart);
router.patch(
    "/remove",
    authUser,
    authorize([BUYER]),
    validateBody(type.REMOVE_CART),
    removeFromCart
);

module.exports = router;
