import { convexAuth } from "@convex-dev/auth/server";
import { ResendOTP } from "./functions/resendOTP";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [ResendOTP],
});
