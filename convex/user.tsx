import {v} from "convex/values";
import {mutation, query} from "./_generated/server";
import {api} from "@/convex/_generated/api";

export const getUser = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db
            .query("user")
            .filter((q) => q.eq(q.field("email"), args.email))
            .first();
        return result;
    },
});

export const createUser = mutation({
    args: {
        kindeId: v.string(),
        name: v.string(),
        email: v.string(),
        image: v.string(),
        teams: v.array(v.id("team")),
    },
    handler: async (ctx, args) => {
        const result = await getUser(ctx, {email: args.email});
        if (result) return result._id;
        return await ctx.db.insert("user", args);
    },
});


export const updateUserTeams = mutation({
    args: {
        userId: v.id("user"),
        teamIds: v.array(v.id("teams"))
    },
    handler: async (ctx, args) => {
        return await ctx.db.patch(args.userId, {teams: args.teamIds});
    },
});
