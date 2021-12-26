module.exports = async (req, res, next) => {
    // user id
    // productsids and quantity
    const product = req.body.product;
    const quantity = req.body.quantity;

    const cart = await req.user.getCart();

    const index = cart.products?.findIndex((p) => p.product.toString() === product);
    if (index === -1) cart.products = [...cart.products, { product, quantity }];
    else {
        const newCartProduct = [...cart.products];
        newCartProduct[index] = { product, quantity };
        cart.products = newCartProduct;
        // console.log();
    }

    cart.save();

    res.send({ success: { message: "Products Add to Cart", cart: cart.products } });
};
