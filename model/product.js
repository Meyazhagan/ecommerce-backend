const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const ProductSchema = new Schema({
    title: {
        type: String,
        minlength: 5,
        maxlength: 200,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 2048,
        trim: true,
        required: true,
    },
    category: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String,
        trim: true,
        required: true,
    },
    // seller: {
    //     type: ObjectId,
    //     required: true,
    //     ref: "User",
    // },
    rating: {
        rate: {
            type: Number,
            min: 0,
            max: 5,
            required: true,
        },
        count: {
            type: Number,
            min: 0,
            required: true,
        },
    },
});

const Product = model("Product", ProductSchema);

module.exports = Product;
