const Product = require("../../model/product");

module.exports = async (req, res) => {
    const seller = req.user._id;

    const { search, priceFrom, priceTo, category, ratingFrom, ratingTo } = req.query;

    const filter = {};

    const pattern = new RegExp(search);

    if (search) filter = { title: pattern, description: pattern };
    if (priceFrom) filter.price = { $gte: priceFrom };
    if (priceTo) filter.price = { ...filter?.price, $lte: priceTo };
    if (category) filter.category = { $in: category };
    if (ratingFrom) filter.rating = { $gte: ratingFrom };
    if (ratingTo) filter.rating = { ...filter?.rating, $lte: ratingTo };

    const product = await Product.find({ ...filter, seller });
    if (!product) return res.status(404).send({ error: "No Product Found for Seller" });

    res.send({ success: { product } });
};
