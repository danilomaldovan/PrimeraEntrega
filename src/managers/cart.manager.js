import fs from "fs";
import { __dirname } from "../utils.js";
import { CART_PATH, PRODUCTS_PATH } from "../paths.js";
import ProductManager from "./product.manager.js";

const productManager = new ProductManager(PRODUCTS_PATH);

const generateId = (carts) =>
  carts.reduce((maxId, cart) => (cart.id > maxId ? cart.id : maxId), 0) + 1;

const saveCartsToFile = async (carts) => {
  await fs.promises.writeFile(CART_PATH, JSON.stringify(carts));
};

const getCartsFromFile = async () => {
  if (fs.existsSync(CART_PATH)) {
    const cartsJSON = await fs.promises.readFile(CART_PATH, "utf-8");

    return JSON.parse(cartsJSON);
  }
  return [];
};

export const getCarts = async () => {
  try {
    const carts = await getCartsFromFile();

    return { carts };
  } catch (error) {
    return { error };
  }
};

export const getCartById = async (id) => {
  try {
    const carts = await getCartsFromFile();

    return { cart: carts.find((c) => c.id === id) };
  } catch (error) {
    return { error };
  }
};

export const createCart = async () => {
  try {
    const carts = await getCartsFromFile();

    const newCart = {
      id: generateId(carts),
      products: [],
    };

    carts.push(newCart);

    await saveCartsToFile(carts);

    return { cart: newCart };
  } catch (error) {
    return { error };
  }
};

export const saveProductToCart = async (cartId, productId) => {
  try {
    const carts = await getCartsFromFile();
    const { cart } = await getCartById(cartId);

    const { product } = await productManager.getProductById(productId);

    if (!product) throw new Error("Product not found");
    if (!cart) throw new Error("Cart not found");

    const productInCart = cart.products.find((prod) => prod.id === productId);

    if (productInCart) productInCart.quantity++;
    else
      cart.products.push({
        id: productId,
        quantity: 1,
      });

    const updatedCarts = carts.map((c) => (c.id === cartId ? cart : c));

    await saveCartsToFile(updatedCarts);

    return { cart };
  } catch (error) {
    return { error };
  }
};

export const removeProductFromCart = async (cartId, productId) => {
  try {
    const carts = await getCartsFromFile();
    const { cart } = await getCartById(cartId);

    const { product } = await productManager.getProductById(productId);

    if (!product) throw new Error("Product not found");
    if (!cart) throw new Error("Cart not found");

    const productInCart = cart.products.find((prod) => prod.id === productId);

    if (productInCart && productInCart.quantity > 0) productInCart.quantity--;

    const updatedCarts = carts.map((c) => (c.id === cartId ? cart : c));

    await saveCartsToFile(updatedCarts);

    return { cart };
  } catch (error) {
    return { error };
  }
};