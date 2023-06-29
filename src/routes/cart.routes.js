import { Router } from "express";
import * as cartManager from "../managers/cart.manager.js";

const router = Router();

router.get("/", async (req, res) => {
  const { carts, error } = await cartManager.getCarts();

  if (error) res.status(500).json({ error: `${error}` });
  else res.json({ data: carts });
});

router.post("/", async (req, res) => {
  const { cart, error } = await cartManager.createCart();

  if (error) res.status(500).json({ error: `${error}` });
  else res.json({ data: cart });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { cart, error } = await cartManager.getCartById(Number(id));

  if (error) res.status(500).json({ error: `${error}` });
  else if (cart) res.json({ data: cart });
  else res.json({ message: `Cart ${id} not found` });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  const { cart, error } = await cartManager.saveProductToCart(
    Number(cid),
    Number(pid)
  );

  if (error) res.status(500).json({ error: `${error}` });
  else res.json({ data: cart });
});

export default router;