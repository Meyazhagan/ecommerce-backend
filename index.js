require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const { createServer } = require("http");

const mongooseConnect = require("./shared/mongoose");

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");

const errors = require("./middleware/errors");
const logging = require("./middleware/logging");
const productRouter = require("./routes/product.routes");
const cartRouter = require("./routes/cart.routes");
const CheckoutRouter = require("./routes/checkout.routes");

// Connecting to mongo db
mongooseConnect();

const app = express();

const httpServer = createServer(app);

// Enabling CORS
app.use(cors());
// Parsing as JSON
app.use(express.json());

app.use(logging);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.use("/api/checkout", CheckoutRouter);

app.use(errors);

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => console.log(`Listening to Port - ${PORT}`));
