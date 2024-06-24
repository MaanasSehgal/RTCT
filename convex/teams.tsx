import {v} from "convex/values";
import {mutation, query} from "./_generated/server";
import {getUser, updateUserTeams} from "@/convex/user";

export const getDefaultTeam = query({
    args: {userId: v.string()},
    handler: async (ctx, args) => {
        return await ctx.db
            .query("teams")
            .filter((q) => q.eq(q.field("createdBy"), args.userId))
            .collect();
    },
});
export const getTeam = query({
    args: {teamId: v.id("teams")},
    handler: async (ctx, args) => {
        return await ctx.db
            .get(args.teamId);
    },
});

export const getTeams = query({
    args: {email: v.string()},
    handler: async (ctx, args) => {
        const user = await getUser(ctx, {email: args.email});
        let teams = [];
        for (let teamId of user.teams) {
            const team = await ctx.db.get(teamId);
            teams.push(team);
        }
        return teams;
    },
});



export const createTeam = mutation({
    args: {
        teamName: v.string(),
        image: v.string(),
        createdBy: v.string(),
        members: v.array(v.string()),
        workspaces: v.array(v.string())
    },
    handler: async (ctx, args) => {
        const id = await ctx.db.insert("teams", args);
        const user = await ctx.db
            .query("user")
            .filter((q) => q.eq(q.field("kindeId"), args.createdBy))
            .first();
        await updateUserTeams(ctx, {userId: user._id, teamIds: [...user.teams, id]});
        return id;
    },
});


export const addTeamMembers = mutation({
    args: {
        teamId: v.id("teams"),
        members: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        const team = await ctx.db.get(args.teamId);
        const id = await ctx.db.patch(args.teamId, {
            members: [...team.members, args.members]
        })
        for(let member of args.members){
            const user = await ctx.db
                .query("user")
                .filter((q) => q.eq(q.field("kindeId"), member))
                .first();
            await updateUserTeams(ctx, {userId: user._id, teamIds: [...user.teams, args.teamId]});
        }
        return id;
    },
});
