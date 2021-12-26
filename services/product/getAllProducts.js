const Product = require("../../model/product");
const productData = require("../../helper/ProductsData.json");

module.exports = async (req, res) => {
    const { search, priceFrom, priceTo, category, seller, ratingFrom, ratingTo } = req.query;

    const filter = {};

    const pattern = new RegExp(search);

    if (search) filter = { title: pattern, description: pattern };
    if (priceFrom) filter.price = { $gte: priceFrom };
    if (priceTo) filter.price = { ...filter?.price, $lte: priceTo };
    if (category) filter.category = { $in: category };
    if (seller) filter.seller = { $in: seller };
    if (ratingFrom) filter.rating = { $gte: ratingFrom };
    if (ratingTo) filter.rating = { ...filter?.rating, $lte: ratingTo };

    const product = await Product.find(filter);

    res.send({ success: { product } });
};
