const authUser = require("../middleware/authUser");
const { BUYER } = require("../model/role");
const authorize = require("../permissions/authorize");
const checkoutProduct = require("../services/checkout/checkoutProduct");
const createOrder = require("../services/checkout/createOrder");
const orderDetails = require("../services/checkout/orderDetails");

const router = require("express").Router();

router.get("/", authUser, authorize([BUYER]), checkoutProduct);

router.post("/create-order", authUser, authorize([BUYER]), createOrder);

// router.get("/error");
router.get("/orders", authUser, orderDetails);

module.exports = router;
