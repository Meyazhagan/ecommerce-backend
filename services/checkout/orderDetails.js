const Order = require("../../model/order");

module.exports = async (req, res, next) => {
    const user = req.user;
    const filter = {};
    if (user.role === "BUYER") filter.user = user._id;

    const orders = await Order.find(filter)
        .populate("products.product")
        .populate("user", "firstName email");

    res.send({ success: { orders } });
};
