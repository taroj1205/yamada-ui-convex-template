import { defineTable } from "convex/server";
import { v } from "convex/values";

export const users = defineTable({
  name: v.optional(v.string()),
  image: v.optional(v.string()),
  email: v.optional(v.string()),
  emailVerificationTime: v.optional(v.number()),
  phone: v.optional(v.string()),
  phoneVerificationTime: v.optional(v.number()),
  isAnonymous: v.optional(v.boolean()),
  // Add any additional fields as needed
}).index("email", ["email"]);
