import { defineTable } from "convex/server";
import { v } from "convex/values";

export const counter = defineTable({
  value: v.number(),
  userId: v.string(),
}).index("by_userId", ["userId"]);
