const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CartProductSchema = new Schema({
    product: {
        type: ObjectId,
        required: true,
        ref: "Product",
    },
    quantity: {
        type: Number,
        min: 0,
        required: true,
    },
});

const CartSchema = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: "User",
    },
    products: {
        type: [CartProductSchema],
    },
});

const Cart = model("Cart", CartSchema);

module.exports = Cart;
