const { getSession } = require("../stripe/stripeWebHook");

module.exports = async (req, res, next) => {
    const { session_id } = req.query;
    const { cartId } = req.params;

    const session = await getSession(session_id);
    res.send({ session, cartId });
};
