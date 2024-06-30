"use client";

import { RTCTLogo } from "@/components/Logos/Logos";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import {useRouter} from "next/navigation";

const Page = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);

    const handleLounchWorkspace = () => {
        setLoading(true);
        setTimeout(() => {
            router.push("https://ide-xz1231.rtct.tech/", )
        }, 1500);
    }

    return (
        <div className="h-screen w-full dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center bg-black">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className='sm:w-3/5 lg:w-3/5 h-3/5 bg-[#131217] rounded-3xl flex shadow-sm shadow-purple-400'>
                <div className="w-2/5 h-full flex justify-center items-center border-r border-gray-700">
                    <RTCTLogo size="150" />
                </div>
                <div className="w-3/5 h-full flex flex-col items-center justify-center p-6 gap-10">
                    <h1 className="text-white text-3xl font-bold">Your Code Workspace</h1>
                    {loading ? (
                        <Button isLoading onClick={() => handleLounchWorkspace()} className="bg-[--darkBtn] rounded-full h-12 flex justify-center items-center text-white text-xl md:text-2xl font-extrabold ">Loading Workspace</Button>
                    )
                    : (
                        <Button onClick={() => handleLounchWorkspace()} className="bg-[--darkBtn] rounded-full h-12 flex justify-center items-center text-white text-xl md:text-2xl font-extrabold ">Lounch Workspace</Button>
                    )
                }
                </div>

            </div>
        </div>
    );
};

export default Page;