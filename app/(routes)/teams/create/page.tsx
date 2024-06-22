import {Input} from "@/app/(auth)/_components/Input";
import React from "react";
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
import {Button} from "@nextui-org/react";

const Page: React.FC = () => {
    return (
        <div className="min-h-screen w-full flex justify-center items-center">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button>Show Dialog</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl">Create your team!</AlertDialogTitle>
                        <AlertDialogDescription>
                            <form action="" className="bg-transparent p-6 rounded-lg shadow-md space-y-4">
                                <div className="flex flex-col my-2 gap-2">
                                    <label htmlFor="projectName" className="text-white">
                                        Project Name <span className="text-red-500">*</span>
                                    </label>
                                    <Input id="projectName" type="text" placeholder="Project Name" className="bg-white text-black p-2 rounded-lg w-full" required />
                                </div>
                                <div className="flex flex-col my-2 gap-2">
                                    <label htmlFor="projectImage" className="text-white">
                                        Project Image
                                    </label>
                                    <Input id="projectImage" type="file" accept="image/*" className="bg-gray-100 text-black p-3 rounded-lg w-full" />
                                </div>
                                <div className="flex flex-col my-2 gap-2">
                                    <label htmlFor="githubRepo" className="text-white">
                                        GitHub Repo <span className="text-red-500">*</span>
                                    </label>
                                    <Input id="githubRepo" type="url" placeholder="GitHub Repo" className="bg-white text-black p-2 rounded-lg w-full" required />
                                </div>
                                <br />
                                <div className="flex items-center my-2 gap-4">
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <Button type="submit" className="bg-gray-600 text-white rounded-lg">
                                        Create
                                    </Button>
                                </div>
                            </form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter></AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Page;
