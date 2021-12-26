const Product = require("../../model/product");

module.exports = async (req, res) => {
    const seller = req.user._id;
    const { id } = req.params;
    const productData = req.body;

    const product = await Product.findOneAndUpdate(
        { _id: id, seller },
        { $set: productData },
        { new: true }
    );
    if (!product) return res.status(404).send({ error: "No Product Found for given product Id" });

    res.send({ success: { message: "Product is Updated", product } });
};
