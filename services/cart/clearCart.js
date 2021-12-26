module.exports = async (req, res, next) => {
    const cart = await req.user.getCart();

    cart.products = [];

    cart.save();

    res.send({ success: { message: "Products Add to Cart" } });
};
