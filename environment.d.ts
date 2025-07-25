/// <reference types="next" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * Convex deployment name, e.g. "convex:your-convex-db"
     */
    CONVEX_DEPLOYMENT: string;
    /**
     * Convex URL for client-side usage
     * Example: "http://127.0.0.1:3210"
     */
    NEXT_PUBLIC_CONVEX_URL: string;
    /**
     * Auth provider URL for client-side usage
     * Example: "https://auth.example.com"
     */
    NEXT_PUBLIC_AUTH_URL: string;
    /**
     * Convex site URL for client-side usage
     * Example: "https://your-convex-deployment.site"
     */
    SITE_URL: string;
    /**
     * Resend from email domain
     * Example: "your-resend-from-email-domain.com"
     */
    AUTH_RESEND_FROM_EMAIL_DOMAIN: string;
    /**
     * Resend API key
     * Example: "your-resend-key"
     */
    AUTH_RESEND_KEY: string;
  }
}
