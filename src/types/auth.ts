import type { z } from "zod";
import type { otpSignInFormSchema } from "~/schemas/auth";

export type OtpSignInFormData = z.infer<typeof otpSignInFormSchema>;
