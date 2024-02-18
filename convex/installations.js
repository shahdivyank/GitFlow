import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getInstallations = query({
  args: { repo: v.string(), workflow: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("installations")
      .filter((q) =>
        q.and(
          q.eq(q.field("repo"), args.repo),
          q.eq(q.field("workflow"), args.workflow)
        )
      )
      .first();
  },
});

export const getCounts = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("installations")
      .filter((q) => q.eq(q.field("workflow"), args.name))
      .collect();
  },
});
