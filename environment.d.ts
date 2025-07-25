/// <reference types="next" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * Convex URL for client-side usage
     * Example: "http://localhost:3210"
     */
    NEXT_PUBLIC_CONVEX_URL: string;

    /**
     * Indicates if the setup script has run
     * Example: "0"
     */
    SETUP_SCRIPT_RAN: string;

    /**
     * Resend API key
     * Example: "your-resend"
     */
    AUTH_RESEND_KEY: string;

    /**
     * Resend from email domain
     * Example: "example.com"
     */
    AUTH_RESEND_FROM_EMAIL_DOMAIN: string;

    /**
     * Convex self-hosted admin key
     * Example: "your-admin-key"
     */
    CONVEX_SELF_HOSTED_ADMIN_KEY: string;

    /**
     * Convex self-hosted URL
     * Example: "http://localhost:3210"
     */
    CONVEX_SELF_HOSTED_URL: string;

    /**
     * Convex site URL
     * Example: "https://your-convex-deployment.site"
     */
    CONVEX_SITE_URL: string;
  }
}
