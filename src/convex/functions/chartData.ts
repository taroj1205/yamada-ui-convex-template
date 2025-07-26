import { v } from "convex/values";
import { internalMutation, mutation, query } from "~/convex/_generated/server";

export const getChartData = query({
  args: {
    limit: v.optional(v.number()),
  },
  returns: v.object({
    lineData: v.array(
      v.object({
        name: v.string(),
        value: v.number(),
        timestamp: v.number(),
      })
    ),
    barData: v.array(
      v.object({
        name: v.string(),
        value: v.number(),
        category: v.string(),
      })
    ),
  }),
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;

    const chartData = await ctx.db.query("chartData").order("asc").take(limit);

    const lineData = chartData.map((data) => ({
      name: data.name,
      value: data.value,
      timestamp: data._creationTime,
    }));

    const barData = chartData.map((data) => ({
      name: data.name,
      value: data.value,
      category: data.category,
    }));

    return {
      lineData,
      barData,
    };
  },
});

export const addChartData = mutation({
  args: {
    name: v.string(),
    value: v.number(),
    category: v.string(),
  },
  returns: v.id("chartData"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("chartData", {
      name: args.name,
      value: args.value,
      category: args.category,
    });
  },
});

export const generateChartData = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const categories = ["Sales", "Revenue", "Users", "Growth"];
    const names = ["Q1", "Q2", "Q3", "Q4", "Q5"];
    const maxDataPoints = 50;

    // Get the latest data point to create a realistic progression
    const latestData = await ctx.db.query("chartData").order("desc").first();

    let newValue: number;
    let newCategory: string;
    let newName: string;

    if (latestData) {
      // Create realistic progression based on the last value
      const baseValue = latestData.value;
      const variation = (Math.random() - 0.5) * 20; // ±10 variation
      newValue = Math.max(0, Math.floor(baseValue + variation));

      // Sometimes change category for variety
      newCategory =
        Math.random() > 0.7
          ? categories[Math.floor(Math.random() * categories.length)]
          : latestData.category;

      // Cycle through names
      const currentNameIndex = names.indexOf(latestData.name);
      newName = names[(currentNameIndex + 1) % names.length];
    } else {
      // First data point
      newValue = Math.floor(Math.random() * 50) + 10;
      newCategory = categories[Math.floor(Math.random() * categories.length)];
      newName = names[0];
    }

    // Add new data point
    await ctx.db.insert("chartData", {
      name: newName,
      value: newValue,
      category: newCategory,
    });

    // Clean up old data points if we exceed the limit
    const allData = await ctx.db.query("chartData").collect();

    if (allData.length > maxDataPoints) {
      const oldestData = await ctx.db
        .query("chartData")
        .order("asc")
        .take(allData.length - maxDataPoints);

      const deletePromises = oldestData.map((data) => ctx.db.delete(data._id));
      await Promise.all(deletePromises);
    }

    return null;
  },
});
