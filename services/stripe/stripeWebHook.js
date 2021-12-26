const stripe = require("stripe")(process.env.STRIPE_KEY);

const getSession = async (id) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(id);
        return session;
    } catch (err) {
        return null;
    }
};

const checkout = async (cart) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/create-order?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cart`,
            line_items: cart.products.map((p) => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: p?.product?.title,
                        },
                        unit_amount: p.product?.price?.toFixed(2) * 100,
                    },
                    quantity: p?.quantity,
                };
            }),
        });
        return session;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = { checkout, getSession };
