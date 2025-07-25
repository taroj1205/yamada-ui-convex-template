import { Resend } from "@convex-dev/resend";
import { components } from "./_generated/api";
import { internalMutation } from "./_generated/server";

export const resend: Resend = new Resend(components.resend, {
  apiKey: process.env.AUTH_RESEND_KEY,
});

export const sendTestEmail = internalMutation({
  handler: async (ctx) => {
    await resend.sendEmail(ctx, {
      from: "Your App <noreply@yourdomain.com>",
      to: "Recipient <recipient@example.com>",
      subject: "Welcome to Our App!",
      html: "<strong>Hello!</strong> This is a test email.",
    });
  },
});
