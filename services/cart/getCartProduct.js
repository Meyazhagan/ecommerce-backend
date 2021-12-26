const Cart = require("../../model/cart");

module.exports = async (req, res, next) => {
    const cart = await req.user.getCart();

    const newCart = await Cart.findById(cart._id).populate("products.product");

    newCart.products = newCart.products.filter(({ product }) => product);

    return res.send({ success: { cart: newCart.products } });
};
