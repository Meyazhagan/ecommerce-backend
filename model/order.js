const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const OrderProductSchema = new Schema({
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

const OrderSchema = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: "User",
    },
    paymentId: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        min: 1,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    products: {
        type: [OrderProductSchema],
        required: true,
    },
});

const Order = model("Order", OrderSchema);

module.exports = Order;
