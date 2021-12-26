const { pick } = require("lodash");
const Cart = require("../../model/cart");
const Order = require("../../model/order");
const { getSession } = require("../stripe/stripeWebHook");

module.exports = async (req, res) => {
    const cart = await req.user.getCart();

    const { session_id } = req.query;
    const session = await getSession(session_id);
    if (!session) return res.status(400).send({ error: "Invalid Session" });

    if (session.payment_status !== "paid")
        return res.status(400).send({ error: "Invalid Session" });

    const paymentId = session.payment_intent;
    const email = session.customer_details.email;
    const totalAmount = session.amount_total;

    const order = await Order.findOne({ paymentId });
    if (order) return res.status(400).send({ error: "Order is Already Placed" });

    const newOrder = await new Order(pick(cart, ["user", "products"]));
    newOrder.paymentId = paymentId;
    newOrder.email = email || "buyer@gmail.com";
    newOrder.totalAmount = totalAmount;

    await newOrder.save();

    const updateCart = await Cart.findById(cart._id);

    updateCart.products = [];
    await updateCart.save();

    res.send({ success: { order: newOrder } });
};
