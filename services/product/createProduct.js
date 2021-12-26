const Product = require("../../model/product");

module.exports = async (req, res, next) => {
    const productData = req.body;
    productData.seller = req.user?._id;

    const newProduct = await new Product(req.body);

    newProduct.rating = {
        rate: 1,
        count: 0,
    };

    await newProduct.save();

    res.send({ success: { product: newProduct, message: "Product is Created" } });
};
