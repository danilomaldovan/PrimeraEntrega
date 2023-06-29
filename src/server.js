import express from "express";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/cart.routes.js";

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productsRouter);
app.use("/carts", cartsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});