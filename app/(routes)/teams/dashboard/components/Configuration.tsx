import { Button, Input } from "@nextui-org/react";
import { Pencil, Trash2, X } from "lucide-react";
import Image from "next/image";
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
} from "@/components/UI/alert-dialog"


const Configuration = ({ projectId }: any) => {
    return (
        <form className="w-full min-h-screen h-[300vh] p-8 flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-white">Configuration</h1>

            <h2 className="text-xl font-semibold text-white">Project Information</h2>

            <br /><br />
            <h1>Team Logo</h1>
            <Image src="/teamlogo.jpeg" alt="teamlogo" width={300} height={300} />
            <div className="flex">
                <Pencil /> <Input value={"team_logo_value"} variant="underlined" placeholder="Project Name" className="w-1/2" />
                <button className="bg-[#29903B] p-2 px-4 rounded-xl text-white text-medium hover:bg-[#36a048] font-bold">
                    Rename
                </button>
            </div>
            <br />
            <div className="flex">
                <Pencil /> <Input value={"github_repo_link"} variant="underlined" placeholder="Github Repo Link" className="w-1/2" />
                <button className="bg-[#29903B] p-2 px-4 rounded-xl text-white text-medium hover:bg-[#36a048] font-bold">
                    Change repo
                </button>
            </div>
            <div className="flex gap-3">
                <AlertDialog>
                    <AlertDialogTrigger>
                        <div className="bg-[#21262D] p-2 px-4 rounded-xl text-[#F85951] text-medium hover:bg-[#B6232D] hover:text-white font-bold">
                            Delete this project
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-[#161B22]">
                        <div className="text-white flex flex-row justify-between items-center border-b-3 border-[#23282F] ">
                            <h2 className="text-xl">Delete Project</h2>
                            <AlertDialogCancel className="bg-transparent inline-block border-none outline-none hover:bg-transparent mb-2">
                                <X className="bg-[#292E36] text-[#C9D1D9] rounded-xl" />
                            </AlertDialogCancel>
                        </div>
                        <AlertDialogDescription className="text-[#C9D1D9] py-4 flex flex-col">
                            <div className="self-center my-2 text-2xl text-white">
                                {"Project Name"}
                            </div>
                            <p className="text-xl">
                                Are you sure you want to delete this project? This action cannot be undone and will also delete all your progress.
                            </p>
                        </AlertDialogDescription>
                            <AlertDialogAction className="text-[#C9D1D9] bg-[#21262D] hover:bg-[#292E36] text-bold text-xl py-5 my-4 rounded-xl">I want to delete this project</AlertDialogAction>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </form >
    );
}

export default Configuration;