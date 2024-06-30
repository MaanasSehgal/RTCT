"use client";
// import { Input } from "@/app/(auth)/_components/Input";
import { Card, CardBody, CardFooter, Image, Divider, Spinner } from "@nextui-org/react";
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
} from "@/components/ui/alert-dialog";
import { Button, Slider } from "@nextui-org/react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import TeamCard from "./_components/TeamCard";
import { CirclePlus, Github, Plus, Rocket, Terminal } from "lucide-react";
import { CarouselSpacing } from "./_components/CarouselSpacing";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

import axios from "axios";
import NavbarComponent from "@/components/Navbar/Navbar";

const Page: React.FC = () => {
    const teamName = useRef("");
    const teamImage = useRef("");
    const [open, setOpen] = useState(false)
    const { user, getToken } = useKindeBrowserClient();
    const [projects, setProjects] = useState<any[] | undefined>(undefined);
    const [yourProjects, setYourProjects] = useState<any[] | undefined>(undefined);
    //const getUser=useQuery(api.user.getUser,{email:user?.email});

    useEffect(() => {
        if (user) {
            (async () => {
                await checkUser();
            })();

        }
    }, [user])

    // useEffect(() => {
    //     console.log(teamList);
    // }, [teamList]);

    const getSharedProjects = (projects: any, yourProjects: any) => {

        return projects.filter((project: any) => {
            return !yourProjects.some((yourProject: any) => yourProject.name === project.name);
        })
    }

    const checkUser = async () => {
        console.log(getToken());
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/create`, {}, {
            params: {
                audience: "rtct_backend_api"
            },
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        })
            .then(function (response) {
                console.log(response);
                const yourProjects = response.data.adminProjects;
                const sharedProjects = (response.data.projects) ? getSharedProjects(response.data.projects, yourProjects) : null;
                setYourProjects(yourProjects);//your projects
                setProjects(sharedProjects);//shared projects
            })
            .catch(function (error) {
                console.log(error);
            });
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
        let file: File | string = formData.get('projectImage') as File;
        const name = formData.get('projectName') as string;
        const repo = formData.get('projectRepo') as string;
        console.log(file)
        if (file.size === 0) {
            file = '/RTCTLOGOIMG.png';
        } else {
            file = await fileToBase64(file);
        }
        console.log(name, file);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/create`,
            {
                name: name,
                image: file,
                githubRepo: repo
            },
            {
                params: {
                    audience: "rtct_backend_api"
                },
                headers: {
                    'Authorization': 'Bearer ' + getToken()
                },

            }
        )
            .then(function (response) {
                console.log("this is shared project = " + response.data.projects);
                const yourProjects = response.data.adminProjects;
                const sharedProjects = (response.data.projects) ? getSharedProjects(response.data.projects, yourProjects) : null;
                setYourProjects(yourProjects);//your projects
                setProjects(sharedProjects);//shared projects
                setOpen(false)
            })
            .catch(function (error) {
                console.log(error);
                setOpen(false)
            });

    }

    interface User {
        name: string;
        image: string;
    }

    interface ProjectType {
        name: string;
        imageUrl: string;
    }

    interface Project {
        name: string;
        type: ProjectType;
        owner: User;
        createdAt: Date;
        updatedAt: Date;
        participants: User[];
    }

    // const yourProjects = dummyProjects.filter((project) => project.owner === currUser);
    // const sharedProjects = dummyProjects.filter((project) => project.participants.includes(currUser));
    useEffect(() => {
        const footer = document.querySelector('Footer') as HTMLElement;
        if (footer) {
            footer.style.display = 'none';
        }
    }, []);

    return (
        <>
        <NavbarComponent/>
            <div className="projectDashBoradContainer h-auto w-screen mx-auto p-10 shadow-md flex flex-col md:flex-row bg-zinc-950 dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <div
                    className="md:w-2/5 w-full md:mb-0 mb-10 md:h-full flex flex-col items-center justify-center text-white px-[5%] md:px-[2%] lg:px-[5%] gap-10 md:gap-20">
                    <div className='self-start flex flex-col md:px-0 gap-4 mt-6'>
                        <h1 className='text-6xl my-4 md:w-full w-[110%] font-bold'>Welcome Back</h1>
                        <p className='w-full self-start text-start hidden md:inline-block text-2xl font-bold'>Code what in your mind, just like
                            you did when you were younger</p>
                    </div>
                    <div className='md:px-4 min:w-[80%] flex items-center self-start flex-col gap-10'>
                        {/* <Button className="md:text-2xl text-xl h-auto py-3 px-6 w-full font-semibold" color="secondary"
                        radius="md">
                        <div className="flex items-center gap-2">
                            <Github strokeWidth={3} size={30} />
                            <div className="flex flex-col w-4/5">
                                <h4>Import a repo</h4>
                                <p className="text-xs text-gray-400 md:visible hidden">Get started with a GitHub
                                    repository</p>
                            </div>
                        </div>
                    </Button> */}
                        <AlertDialog open={open} onOpenChange={setOpen}>
                            <AlertDialogTrigger asChild>
                                <Button className="md:text-2xl text-xl h-auto py-3 px-6 font-semibold w-full"
                                    variant="ghost"
                                    color="danger" radius="md">
                                    <Rocket strokeWidth={3} size={30} /> New Project
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-2xl">Create Project</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <div>
                                            <form action="" className="bg-transparent p-6 rounded-lg shadow-md space-y-4"
                                                onSubmit={handleSubmit}>
                                                <div className="flex flex-col my-2 gap-2">
                                                    <label htmlFor="projectName" className="text-white">
                                                        Project Name <span className="text-red-500">*</span>
                                                    </label>
                                                    <Input id="projectName" name="projectName" type="text"
                                                        placeholder="Project Name"
                                                        className="text-white p-2 rounded-lg w-full" required
                                                    />
                                                </div>
                                                <div className="flex flex-col my-2 gap-2">
                                                    <label htmlFor="projectRepo" className="text-white">
                                                        Project Github Repo <span className="text-red-500">*</span>
                                                    </label>
                                                    <Input id="projectRepo" name="projectRepo"
                                                        type="url"
                                                        placeholder="github.com/username/repo-name"
                                                        className="text-white p-2 w-full" required
                                                    />
                                                </div>
                                                <div className="flex flex-col my-2 gap-2">
                                                    <label htmlFor="projectImage" className="text-white">
                                                        Project Image
                                                    </label>
                                                    <Input id="projectImage" name="projectImage" accept="image/*" type="file" />
                                                </div>
                                                {/* <div className="flex flex-col my-2 gap-2">*/}
                                                {/*    <label htmlFor="githubRepo" className="text-white">*/}
                                                {/*        GitHub Repo <span className="text-red-500">*</span>*/}
                                                {/*    </label>*/}
                                                {/*    <Input id="githubRepo" type="url" placeholder="GitHub Repo"*/}
                                                {/*           className="bg-white text-black p-2 rounded-lg w-full" required/>*/}
                                                {/*</div> */}
                                                <br />
                                                <div className="flex justify-end my-2 gap-4">
                                                    <AlertDialogCancel className="p-0 border-none hover:bg-transparent"><Button as={AlertDialogCancel} className="text-lg font-black" variant="ghost" type="button">Cancel</Button></AlertDialogCancel>
                                                    <Button className="text-lg font-black border-none outline-none" variant="ghost" color="success" type="submit">Create</Button>
                                                </div>
                                            </form>
                                        </div>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter></AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>

                </div>

                {
                    (!projects || !yourProjects) ? (
                        <div
                            className="md:w-3/5 w-full h-96 md:h-full flex flex-col justify-center items-center bg-[#111114] rounded-lg z-10 cursor-default">
                            <Spinner size="lg" color="primary" />
                        </div>
                    ) : (
                        (projects && yourProjects && projects.length === 0 && yourProjects.length == 0) ? (
                            <div
                                className="md:w-3/5 w-full h-1/2 md:h-full flex flex-col justify-center items-center gap-6 md:gap-4 py-10 bg-[#111114] px-[5%] rounded-lg z-10 cursor-default">
                                <Alert className="border-0 bg-transparent">
                                    <Terminal className="h-4 w-4" />
                                    <AlertTitle className="text-3xl font-semibold">Heads up!</AlertTitle>
                                    <AlertDescription className="text-xl">
                                        You don't have any projects yet, Create one.
                                    </AlertDescription>
                                </Alert>
                            </div>
                        ) : (
                            <div
                                className={`md:w-3/5 w-full h-1/2 md:h-full ${(projects.length === 0 || yourProjects.length === 0) ? 'md:h-3/5 self-center' : 'md:h-full'} flex flex-col justify-center items-center gap-6 md:gap-4 py-10  bg-[#111114] px-[5%] rounded-lg z-10`}>
                                {yourProjects.length > 0 && (
                                    <div className=" w-full flex flex-col">
                                        <h1 className="text-2xl font-semibold mb-4">Your Projects</h1>
                                        <div className="flex justify-center">
                                            <CarouselSpacing isShared={false} projects={yourProjects} states={[setProjects, setYourProjects]} />
                                        </div>
                                    </div>
                                )}
                                {projects.length > 0 && (
                                    <div className=" w-full flex flex-col">
                                        <h1 className="text-2xl font-semibold mb-4">Shared Projects</h1>
                                        <div className="flex justify-center">
                                            <CarouselSpacing isShared={true} projects={projects} states={[setProjects, setYourProjects]} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    )
                }


            </div >
        </>
    );
};

export default Page;

// <div className="min-h-screen h-screen w-full flex flex-row">
//     <div className="bg-yellow-500 w-1/2 h-full flex justify-center">
//         <div className="bg-blue-700 flex flex-col gap-8 my-16 px-8">
//             <h1 className="text-5xl text-white font-extrabold">Welcome back to RTCT!</h1>
//             <p className="text-2xl"> Start creating and managing your projects with ease. Collaborate with your team in real time and boost your productivity.</p>

//             <Button className="bg-[#8964E8] text-2xl rounded-full">Create!</Button>
//         </div>
//     </div>
//     <div className="bg-red-500 w-1/2 h-full flex justify-center">
//         <div className="bg-blue-500 flex flex-col gap-8 my-16 px-12 w-full">
//             <h1 className="text-4xl">Your Projects</h1>
//             <div className="w-4/5 flex flex-wrap bg-purple-500">
//                 <TeamCard />
//                 <TeamCard />


//             </div>
//             <h1 className="text-4xl">Shared Projects</h1>
//             <div className="w-4/5 flex flex-wrap bg-purple-500">Card container</div>

//         </div>
//     </div>

// </div>
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

// </div>