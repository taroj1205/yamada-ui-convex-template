import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { api } from "~/convex/_generated/api";
import { action, mutation, query } from "~/convex/_generated/server";

export const listNumbers = query({
  args: {
    count: v.number(),
  },

  handler: async (ctx, args) => {
    const numbers = await ctx.db
      .query("counter")
      .order("desc")
      .take(args.count);
    const userId = await getAuthUserId(ctx);
    const user = userId === null ? null : await ctx.db.get(userId);
    return {
      user: user ?? null,
      numbers: numbers.reverse().map((number) => number.value) ?? [],
    };
  },
});

export const addNumber = mutation({
  args: {
    value: v.number(),
  },

  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const counter = await ctx.db.insert("counter", {
      value: args.value,
      userId,
    });
    return counter;
  },
});

export const myAction = action({
  args: {
    first: v.number(),
    second: v.string(),
  },

  handler: async (ctx, args) => {
    const _data = await ctx.runQuery(api.functions.counter.listNumbers, {
      count: 10,
    });

    await ctx.runMutation(api.functions.counter.addNumber, {
      value: args.first,
    });
  },
});
