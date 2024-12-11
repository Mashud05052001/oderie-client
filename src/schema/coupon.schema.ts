import { z } from "zod";
import { requiredMsg } from "./auth.schema";

const expiryDateSchema = z.object(
  {
    calendar: z.object({
      identifier: z.string(),
    }),
    era: z.string(),
    year: z.number().int().min(1000).max(9999),
    month: z.number().int().min(1).max(12),
    day: z.number().int().min(1).max(31),
  },
  { required_error: requiredMsg }
);

const couponSchema = z.object({
  code: z.string().optional(),
  percentage: z
    .number({ required_error: requiredMsg })
    .min(0, "Percentage must be at least 0.")
    .max(100, "Percentage cannot exceed 100."),
  expiryDate: expiryDateSchema,
});

export default couponSchema;
