import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";

const createUser = useMutation(api.user.createUser);
const createTeam = useMutation(api.teams.createTeam);

