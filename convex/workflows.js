import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workflows").collect();
  },
});

export const create = mutation({
  args: {
    workflow_name: v.string(),
    description: v.string(),
    environment: v.string(),
    package_manager: v.string(),
    type: v.string(),
    tool: v.string(),
    code: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("workflows", {
      name: args.workflow_name,
      description: args.description,
      environment: args.environment,
      package_manager: args.package_manager,
      type: args.type,
      tool: args.tool,
      code: args.code,
    });
  },
});

export const deleteWorkflow = mutation({
  args: { id: v.id("workflows") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const getWorkflow = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    try {
      return await ctx.db.get(args.id);
    } catch (err) {
      return null;
    }
  },
});
