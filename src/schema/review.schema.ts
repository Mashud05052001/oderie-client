import { z } from "zod";
import { requiredMsg } from "./auth.schema";

export const createVendorResponseSchema = z.object({
  message: z.string().min(1, { message: requiredMsg }),
});
