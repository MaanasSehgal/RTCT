"use client";

import { RTCTLogo } from "@/components/Logos/Logos";
import { Button, Progress } from "@nextui-org/react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import NavbarComponent from "./components/Navbar";

const Page = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const pathName = usePathname();

    const handleLounchWorkspace = () => {
        setLoading(true);
        setTimeout(() => {
            router.push("https://ide-xz1231.rtct.tech/",)
        }, 1500);
    }

    console.log(pathName.slice(0, pathName.length-10));
    return (
        <>
        <NavbarComponent projectId={pathName.slice(0, pathName.length-10)}/>
            <div id="code" className="h-[--mainheight] w-full dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center bg-black">
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
                                <Button onClick={() => handleLounchWorkspace()} className="bg-[--darkBtn] rounded-full h-12 flex justify-center items-center text-white text-xl md:text-2xl font-extrabold ">Launch Workspace</Button>
                            )
                        }
                    </div>

                </div>
            </div>
            <div id="code-spinner" className="w-full h-[--mainheight] bg-[--chatSectionBg] rounded-t-[30px] rounded-r-[30px] hidden text-center text-2xl">
                <Progress
                    color='danger'
                    size="sm"
                    isIndeterminate
                    aria-label="Loading..."
                    className="w-full color-blue-500"
                />
            </div>
        </>
    );
};

export default Page;