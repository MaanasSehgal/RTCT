import {v} from "convex/values";
import {mutation, query} from "./_generated/server";

export const getDefaultTeam = query({
    args: {userId: v.string()},
    handler: async (ctx, args) => {
        return await ctx.db
            .query("teams")
            .filter((q) => q.eq(q.field("createdBy"), args.userId))
            .collect();
    },
});
export const getTeams = query({
    args: {userId: v.string()},
    handler: async (ctx, args) => {
        return await ctx.db
            .query("teams")
            .filter((q) => q.eq(q.field("members"), args.userId))
            .collect();
    },
});

export const createTeam = mutation({
    args: {teamName: v.string(), createdBy: v.string(), members: v.array(v.string()), workspaces: v.array(v.string())},
    handler: async (ctx, args) => {
        return await ctx.db.insert("teams", args);
    },
});
