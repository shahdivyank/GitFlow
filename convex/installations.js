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

export const install = mutation({
  args: {
    repo: v.string(),
    workflow: v.string(),
    number: v.number(),
    url: v.string(),
    head: v.string(),
  },
  handler: async ({ db }, { repo, workflow, number, url, head }) => {
    await db.insert("installations", { repo, workflow, number, url, head });
  },
});

export const deleteInstalls = mutation({
  args: {
    name: v.string(),
  },
  handler: async ({ db }, { name }) => {
    const items = await db
      .query("installations")
      .filter((q) => q.eq(q.field("workflow"), name))
      .collect();

    const copy = items;

    items.forEach(async ({ _id }) => await db.delete(_id));

    return copy;
  },
});

export const getRepos = query({
  args: { repo: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("installations")
      .filter((q) => q.eq(q.field("repo"), args.repo))
      .collect();
  },
});
