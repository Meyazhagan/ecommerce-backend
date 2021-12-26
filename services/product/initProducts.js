const Product = require("../../model/product");
const productData = require("../../helper/ProductsData.json");

module.exports = async (req, res, next) => {
    const productCount = await Product.find({}).count();
    if (productCount > 0) return res.status(400).send({ error: "Failed To Generate Products" });
    const product = await Product.insertMany(productData);
    res.send({ success: "Init Products", product });
};
