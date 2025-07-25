import { z } from "zod";

export const otpSignInFormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
});
