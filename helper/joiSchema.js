const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const type = {
    LOGIN: "LOGIN",
    USER: "USER",
    UPDATE_USER: "UPDATE_USER",
    PASSWORD: "PASSWORD",
    EMAIL: "EMAIL",
    REMOVE_CART: "REMOVE_CART",
    ADD_CART: "ADD_CART",
    REMOVE_CART: "REMOVE_CART",
    PRODUCT: "PRODUCT",
};

const schema = {
    LOGIN: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),

    USER: Joi.object({
        firstName: Joi.string().min(5).max(50).required(),
        lastName: Joi.string().max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        conformPassword: Joi.ref("password"),
        address: {
            street: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            zip: Joi.string(),
        },
    }),
    UPDATE_USER: Joi.object({
        firstName: Joi.string().min(5).max(50),
        lastName: Joi.string().max(50),
        address: {
            street: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            zip: Joi.string(),
        },
    }),

    EMAIL: Joi.object({
        email: Joi.string().email().required(),
    }),

    PASSWORD: Joi.object({
        password: Joi.string().min(5).required(),
        conformPassword: Joi.ref("password"),
    }),
    ADD_CART: Joi.object({
        product: Joi.objectId().required(),
        quantity: Joi.number().min(0).required(),
    }),
    REMOVE_CART: Joi.object({
        product: Joi.objectId().required(),
    }),
    PRODUCT: Joi.object({
        title: Joi.string().min(5).required(),
        description: Joi.string().min(5).required(),
        price: Joi.number().min(0).required(),
        category: Joi.string().required(),
        image: Joi.string().required(),
    }),
};

const validate = (type, data) => {
    const option = { abortEarly: false };

    return schema[type].validate(data, option);
};

const getErrors = (error) =>
    error.details.reduce((acc, { path, message }) => {
        return { ...acc, [path.join("-")]: message };
    }, {});

exports.validateBody = (type) => {
    return (req, res, next) => {
        const { error } = validate(type, req.body);

        if (error) {
            const errors = getErrors(error);

            return res.status(400).send({ errors });
        }

        next();
    };
};
exports.validateQuery = (type) => {
    return (req, res, next) => {
        const { error } = validate(type, req.query);

        if (error) {
            const errors = getErrors(error);

            return res.status(400).send({ errors });
        }

        next();
    };
};

exports.type = type;
