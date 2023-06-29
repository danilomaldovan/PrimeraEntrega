import { dirname } from "path";
import { fileURLToPath } from "url";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const areProductFieldsValid = ({
  title,
  description,
  price,
  category,
  code,
  stock,
}) => {
  if (typeof title !== "string" || !title) return false;
  if (typeof description !== "string" || !description) return false;
  if (typeof price !== "number" || price < 0) return false;
  if (typeof code !== "string" || !code) return false;
  if (typeof category !== "string" || !category) return false;
  if (typeof stock !== "number" || stock < 0) return false;

  return true;
};