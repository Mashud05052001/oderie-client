import { z } from "zod";
import { requiredMsg } from "./auth.schema";

export const createProductValidationSchem = z.object({
  title: z.string({
    required_error: requiredMsg,
  }),
  description: z.string({
    required_error: requiredMsg,
  }),
  categoryId: z
    .string({
      required_error: requiredMsg,
    })
    .uuid(),
  price: z
    .number({
      required_error: requiredMsg,
    })
    .positive("Price must be a positive number")
    .nonnegative("Quantity cannot be negative"),
  discount: z
    .number()
    .positive("Discount must be a positive number")
    .max(100, "Discount must be less then 100"),
  quantity: z
    .number({
      required_error: requiredMsg,
    })
    .nonnegative("Quantity cannot be negative"),
  pictures: z
    .array(z.instanceof(File))
    .min(1, "At least a picture is required"),
});
