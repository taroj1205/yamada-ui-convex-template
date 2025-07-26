import { defineTable } from "convex/server";
import { v } from "convex/values";

export const chartData = defineTable({
  name: v.string(),
  value: v.number(),
  category: v.string(),
});
