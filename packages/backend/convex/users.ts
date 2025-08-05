import { query, mutation } from "./_generated/server";

export const getMany = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const add = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    const orgId = identity?.orgId as string;
    if (!orgId) {
      throw new Error("No organization found for the user");
    }
    const user = await ctx.db.insert("users", {
      name: "Devansh",
    });
    return user;
  },
});
