const Product = require("../../model/product");

module.exports = async (req, res) => {
    const seller = req.user._id;
    const { id } = req.params;

    const product = await Product.findOne({ _id: id, seller });
    if (!product) return res.status(404).send({ error: "No Product Found for given product Id" });

    res.send({ success: { product } });
};
