"use client";
import { Input } from "@/app/(auth)/_components/Input";
import React, { useEffect, useRef, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/UI/alert-dialog";
import { Button } from "@nextui-org/react";
import { useConvex, useMutation } from "convex/react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import TeamCard from "./_components/TeamCard";

const Page: React.FC = () => {
    const teamName = useRef("");
    const teamImage = useRef("");
    const [open, setOpen] = useState(false)
    const convex = useConvex();
    const { user } = useKindeBrowserClient();
    const [teamList, setTeamList] = useState<any[] | undefined>(undefined);
    //const getUser=useQuery(api.user.getUser,{email:user?.email});

    const createUser = useMutation(api.user.createUser);
    const createTeam = useMutation(api.teams.createTeam);
    useEffect(() => {
        if (user) {
            (async () => {
                await checkUser();
                await checkTeam();
                await fetchTeams();
            })();

        }
    }, [user])

    useEffect(() => {
        console.log(teamList);
    }, [teamList]);

    const fetchTeams = async () => {
        const result = await convex.query(api.teams.getTeams, { email: user?.email || "" });
        setTeamList(result);
    }

    const checkUser = async () => {
        await createUser({
            kindeId: user?.id || "",
            name: `${user?.given_name} ${user?.family_name}` || "",
            email: user?.email || "",
            image: user?.picture || "",
            teams: []
        }).then((resp) => {
            // console.log(resp)
        })
    }
    const checkTeam = async () => {
        const result = await convex.query(api.teams.getDefaultTeam, { userId: user?.id || "" });
        if (!result?.length) {
            await createTeam({
                teamName: `${user?.given_name}'s Team`,
                image: user?.picture || "",
                createdBy: user?.id || "",
                members: [user?.id || ""],
                workspaces: []
            }).then((resp) => {
                // console.log(resp)
            })
        }

    }

    async function fileToBase64(file: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject(new Error('Failed to read file as base64.'));
                }
            };
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        let file: File | string = formData.get('teamImage') as File;
        const name = formData.get('teamName') as string;
        if (file.size === 0) {
            file = user?.picture || "";
        } else {
            file = await fileToBase64(file);
        }
        console.log(name, file);

        const result = await createTeam({
            teamName: name,
            image: file,
            createdBy: user?.id || "",
            members: [user?.id || ""],
            workspaces: []
        })
        const newTeam = await convex.query(api.teams.getTeam, { teamId: result });
        setTeamList((prevState) => {
            if (prevState)
                return [...prevState, newTeam];
            return [newTeam];
        });
        setOpen(false)
    }

    return (
        <div className="min-h-screen h-screen w-full flex flex-row">
            <div className="bg-yellow-500 w-1/2 h-full flex justify-center">
                <div className="bg-blue-700 flex flex-col gap-8 my-16 px-8">
                    <h1 className="text-5xl text-white font-extrabold">Welcome back to RTCT!</h1>
                    <p className="text-2xl"> Start creating and managing your projects with ease. Collaborate with your team in real time and boost your productivity.</p>

                    <Button className="bg-[#8964E8] text-2xl rounded-full">Create!</Button>
                </div>
            </div>
            <div className="bg-red-500 w-1/2 h-full flex justify-center">
                <div className="bg-blue-500 flex flex-col gap-8 my-16 px-12 w-full">
                    <h1 className="text-4xl">Your Projects</h1>
                    <div className="w-4/5 flex flex-wrap bg-purple-500">
                        <TeamCard />
                        <TeamCard />


                    </div>
                    <h1 className="text-4xl">Shared Projects</h1>
                    <div className="w-4/5 flex flex-wrap bg-purple-500">Card container</div>

                </div>
            </div>

        </div>
        // <div className="min-h-screen w-full flex p-4 gap-3">
        //     {
        //         teamList?.map((team) => (
        //             <div
        //                 className="h-[300px] w-[200px] bg-accent rounded-2xl flex flex-col items-center justify-center text-xl font-bold p-2 relative">
        //                 <Image src={team.image} alt="TEAM IMAGE" className="w-full h-full" width={200} height={200}></Image>
        //                 <div>{team.teamName}</div>
        //             </div>
        //         ))
        //     }
        //     <AlertDialog open={open} onOpenChange={setOpen}>
        //         <AlertDialogTrigger asChild>
        //             <Button className="ml-auto">Create Team</Button>
        //         </AlertDialogTrigger>
        //         <AlertDialogContent>
        //             <AlertDialogHeader>
        //                 <AlertDialogTitle className="text-2xl">Create your team!</AlertDialogTitle>
        //                 <AlertDialogDescription>
        //                     <div>
        //                         <form action="" className="bg-transparent p-6 rounded-lg shadow-md space-y-4"
        //                               onSubmit={handleSubmit}>
        //                             <div className="flex flex-col my-2 gap-2">
        //                                 <label htmlFor="teamName" className="text-white">
        //                                     Team Name <span className="text-red-500">*</span>
        //                                 </label>
        //                                 <Input id="teamName" name="teamName" type="text" placeholder="Project Name"
        //                                        className="bg-white text-black p-2 rounded-lg w-full" required
        //                                 />
        //                             </div>
        //                             <div className="flex flex-col my-2 gap-2">
        //                                 <label htmlFor="teamImage" className="text-white">
        //                                     Team Image
        //                                 </label>
        //                                 <Input id="teamImage" name="teamImage" type="file" accept="image/*"
        //                                        className="bg-gray-100 text-black p-3 rounded-lg w-full"
        //                                 />
        //                             </div>
        //                             {/*<div className="flex flex-col my-2 gap-2">*/}
        //                             {/*    <label htmlFor="githubRepo" className="text-white">*/}
        //                             {/*        GitHub Repo <span className="text-red-500">*</span>*/}
        //                             {/*    </label>*/}
        //                             {/*    <Input id="githubRepo" type="url" placeholder="GitHub Repo"*/}
        //                             {/*           className="bg-white text-black p-2 rounded-lg w-full" required/>*/}
        //                             {/*</div>*/}
        //                             <br/>
        //                             <div className="flex items-center my-2 gap-4">
        //                                 <AlertDialogCancel>Cancel</AlertDialogCancel>
        //                                 <Button type="submit" className="bg-gray-600 text-white rounded-lg">
        //                                     Create
        //                                 </Button>
        //                             </div>
        //                         </form>
        //                     </div>
        //                 </AlertDialogDescription>
        //             </AlertDialogHeader>
        //             <AlertDialogFooter></AlertDialogFooter>
        //         </AlertDialogContent>
        //     </AlertDialog>
        // </div>
    );
};

export default Page;