import { Router } from "express";
import ProductManager from "../managers/product.manager.js";
import validateProductMiddleware from "../middlewares/validateProductFields.middleware.js";
import { PRODUCTS_PATH } from "../paths.js";

const router = Router();

const productManager = new ProductManager(PRODUCTS_PATH);

router.get("/", async (req, res) => {
  const { limit } = req.query;
  const { products, error } = await productManager.getProducts();

  if (error) return res.status(500).json({ error: `${error}` });
  else res.json({ products: products.slice(0, limit) });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { product, error } = await productManager.getProductById(Number(id));

  if (error) res.status(500).json({ error: `${error}` });
  else res.json({ product });
});

router.post("/", validateProductMiddleware, async (req, res) => {
  const newProduct = req.body;

  const { product, error } = await productManager.addProduct(newProduct);

  if (error) res.status(500).json({ error: `${error}` });
  else res.json({ product });
});

router.put("/:id", validateProductMiddleware, async (req, res) => {
  const { id } = req.params;
  const newProduct = req.body;

  const { product, error } = await productManager.updateProduct(
    Number(id),
    newProduct
  );

  if (error) res.status(500).json({ error: `${error}` });
  else res.json({ product });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await productManager.deleteProduct(Number(id));

  if (error) res.status(500).json({ error: `${error}` });
  else res.json({ id: Number(id) });
});

export default router;