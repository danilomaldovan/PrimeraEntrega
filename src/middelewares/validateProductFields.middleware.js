import { areProductFieldsValid } from "../utils.js";

const validateProduct = (req, res, next) => {
  const isProductValid = areProductFieldsValid(req.body);

  if (!isProductValid) res.status(400).json({ error: "Invalid fields" });

  next();
};

export default validateProduct;