import { Button } from "@nextui-org/react";
import { CircleCheck, CircleX, Pencil, Trash2, X } from "lucide-react";
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
} from "@/components/ui/alert-dialog"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {Input} from "@/components/ui/input";

const Configuration = ({data, setData}:any)  => {
    const [inputLogo, setInputLogo] = useState(false);
    const [currLogoUrl, setCurrLogoUrl] = useState(data?.image);
    const {user, getToken } = useKindeBrowserClient();
    const [dataState, setDataState] = useState(data);
    useEffect(() => {
        setDataState(data);
        setCurrLogoUrl(data?.image);
    }, [data]);

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

    async function handleSubmit(e: React.FormEvent<HTMLFormElement> | HTMLFormElement) {
        if(!(e instanceof HTMLFormElement)) {
            e.preventDefault();
            e = e.currentTarget;
        }
        const formData = new FormData(e as HTMLFormElement);
        const name = formData.get('projectName') as string;
        const repo = formData.get('projectRepo') as string;
        let file: File | string | null = formData.get('logo') as File;
        console.log(file)
        if (file.size === 0) {
            file = null;
        } else {
            file = await fileToBase64(file);
        }
        await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/update`,
            {
                projectId: data?.projectId,
                name: name,
                githubRepo: repo,
                image: file
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
                console.log(response);
                // setDataState(response.data)
                setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const handleInputLogo = (event: any) => {
        if (event.target.value) {
            setInputLogo(true);
            console.log(event.target.files[0].name);
            setCurrLogoUrl(URL.createObjectURL(event.target.files[0]));

        } else {
            setInputLogo(false);
            setCurrLogoUrl('/teamlogo.jpeg');
        }
    }

    const handleInputLogoCancel = () => {
        setInputLogo(false);
        setCurrLogoUrl('/teamlogo.jpeg');
    }

    const handleInputLogoSave = () => {
        setInputLogo(false);
        handleSubmit((document.getElementById("configForm") as HTMLFormElement));
    }
    return (
        <>
            <h1 className="text-3xl font-bold text-white ml-6 mt-6">Configuration</h1>
            <h5 className="text-xl font-semibold ml-6 text-zinc-600">Project Information</h5>
            <form id="configForm" className="w-full h-5/6 lg:p-8 flex lg:flex-row flex-col items-center gap-14 lg:gap-3 min-w-[300px]"
            action="" onSubmit={handleSubmit}>
                <br /><br />
                <div className="flex flex-col lg:w-2/5 items-center gap-10">
                    <Image className="rounded-full w-44 h-44 object-cover" src={currLogoUrl} width={200} height={200} alt={currLogoUrl} />
                    <div className="flex flex-col justify-center items-center gap-3">
                        <label htmlFor="logo" className="bg-[#29903B] p-2 px-2 rounded-xl text-medium hover:bg-[#287936] font-bold w-32 flex justify-center items-center text-center">Change Logo</label>
                        <input onChange={handleInputLogo} type="file" id="logo" name="logo" className="hidden"/>
                        <div className={`flex gap-3 ${inputLogo ? "flex" : "hidden"}`}>
                            <CircleX onClick={handleInputLogoCancel} size={40} className="cursor-pointer text-[#f9948f] bg-slate-800 p-1 rounded-full hover:text-[#F85951]" />
                            <CircleCheck  onClick={handleInputLogoSave} size={40} className="cursor-pointer text-[#29903B] bg-slate-800 p-1 rounded-full hover:text-[#8df09d]" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 items-start lg:w-3/5">
                    <div className="flex gap-4">
                        <Input defaultValue={dataState?.name} placeholder={dataState?.name} className="w-[30vw]" name="projectName" />
                        <button type="submit" className="bg-[#29903B] p-2 px-4 rounded-xl text-white text-medium hover:bg-[#287936] font-bold">
                            Rename
                        </button>
                    </div>
                    <br />
                    <div className="flex gap-4">
                        <Input defaultValue={dataState?.githubRepo}  placeholder={dataState?.githubRepo} className="w-[30vw]" name="projectRepo" />
                        <button type="submit" className="bg-[#29903B] p-2 px-4 rounded-xl text-white text-medium hover:bg-[#287936] font-bold">
                            Change repo
                        </button>
                    </div>
                    <div className="flex mt-6">
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
                                        {dataState?.name}
                                    </div>
                                    <p className="text-xl">
                                        Are you sure you want to delete this project? This action cannot be undone and will also delete all your progress.
                                    </p>
                                </AlertDialogDescription>
                                <AlertDialogAction className="text-[#C9D1D9] bg-[#21262D] hover:bg-[#292E36] text-bold text-xl py-5 my-4 rounded-xl">I want to delete this project</AlertDialogAction>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </form >
        </>
    );
}

export default Configuration;