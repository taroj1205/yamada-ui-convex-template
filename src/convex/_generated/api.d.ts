/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as crons from "../crons.js";
import type * as functions_auth from "../functions/auth.js";
import type * as functions_chartData from "../functions/chartData.js";
import type * as functions_counter from "../functions/counter.js";
import type * as functions_resendOTP from "../functions/resendOTP.js";
import type * as healthCheck from "../healthCheck.js";
import type * as http from "../http.js";
import type * as sendEmails from "../sendEmails.js";
import type * as tables_chartData from "../tables/chartData.js";
import type * as tables_counter from "../tables/counter.js";
import type * as tables_users from "../tables/users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  crons: typeof crons;
  "functions/auth": typeof functions_auth;
  "functions/chartData": typeof functions_chartData;
  "functions/counter": typeof functions_counter;
  "functions/resendOTP": typeof functions_resendOTP;
  healthCheck: typeof healthCheck;
  http: typeof http;
  sendEmails: typeof sendEmails;
  "tables/chartData": typeof tables_chartData;
  "tables/counter": typeof tables_counter;
  "tables/users": typeof tables_users;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {
  resend: {
    lib: {
      cancelEmail: FunctionReference<
        "mutation",
        "internal",
        { emailId: string },
        null
      >;
      get: FunctionReference<"query", "internal", { emailId: string }, any>;
      getStatus: FunctionReference<
        "query",
        "internal",
        { emailId: string },
        {
          complained: boolean;
          errorMessage: string | null;
          opened: boolean;
          status:
            | "waiting"
            | "queued"
            | "cancelled"
            | "sent"
            | "delivered"
            | "delivery_delayed"
            | "bounced";
        }
      >;
      handleEmailEvent: FunctionReference<
        "mutation",
        "internal",
        { event: any },
        null
      >;
      sendEmail: FunctionReference<
        "mutation",
        "internal",
        {
          from: string;
          headers?: Array<{ name: string; value: string }>;
          html?: string;
          options: {
            apiKey: string;
            initialBackoffMs: number;
            onEmailEvent?: { fnHandle: string };
            retryAttempts: number;
            testMode: boolean;
          };
          replyTo?: Array<string>;
          subject: string;
          text?: string;
          to: string;
        },
        string
      >;
    };
  };
};
