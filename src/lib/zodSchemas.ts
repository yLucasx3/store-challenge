import { z } from "zod";

const productSchema = z.object({
  name: z
    .string()
    .min(2, { message: "The product name must be at least 2 characters long" })
    .max(60, {
      message: "The product name cannot be longer than 60 characters",
    }),
  price: z.coerce
    .number()
    .positive({ message: "The price of the product must be greater than 1" })
    .min(1, { message: "The price of the product must be greater than 1" }),
  description: z
    .string()
    .min(10, {
      message: "The product description must be at least 10 characters long",
    })
    .max(2000, {
      message: "Product description cannot be longer than 2000 characters",
    }),
  image: z
    .string()
    .url({ message: "A imagem do produto precisa ser uma URL" })
    .optional(),
});

export { productSchema };
