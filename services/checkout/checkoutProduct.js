const Cart = require("../../model/cart");
const { checkout } = require("../../services/stripe/stripeWebHook");

module.exports = async (req, res) => {
    const cart = await req.user.getCart();
    const checkoutCart = await Cart.findById(cart._id).populate("products.product");

    checkoutCart.products = checkoutCart.products.filter(({ product }) => product);
    await checkoutCart.save();

    const session = await checkout(checkoutCart);
    return res.send({ url: session?.url });
};
