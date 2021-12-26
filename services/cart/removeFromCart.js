const Cart = require("../../model/cart");

module.exports = async (req, res, next) => {
    // user id
    // productsids and quantity
    const product = req.body.product;

    const cart = await req.user.getCart();

    const newCart = await Cart.findById(cart._id).populate("products.product");

    const index = cart.products?.findIndex((p) => p.product.toString() === product);
    if (index === -1) return res.status(404).send({ error: "No Product Found In Cart" });
    else {
        const newCartProduct = [...newCart.products];
        newCart.products = [...newCartProduct.slice(0, index), ...newCartProduct.slice(index + 1)];
    }

    newCart.save();

    res.send({ success: { message: "Products Removed From Cart", cart: newCart.products } });
};
