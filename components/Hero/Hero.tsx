import React from "react";
import { RTCTLogo } from "../Logos/Logos";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import Link from "next/link";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Hero = () => {
    const { user, isLoading } = useKindeBrowserClient();
    return (
        <div id="scroll-to-home" className="h-[90vh] w-full dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center bg-black">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="flex flex-col justify-center items-center px-[7vw] gap-2 lg:flex-row lg:gap-10">
                <div className="flex flex-col justify-between items-center lg:w-[70%]">
                    <p className="text-[5vh] md:text-[6vh] lg:text-[7vh] py-2 font-bold relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-400">
                        Collaborate seamlessly, create effortlessly
                    </p>
                    <p className="mt-4 text-xl font-bold relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-400">
                        Transform collaboration with real-time editing of code, documents, and spreadsheets. Enjoy intuitive task management, chat, video calls, and secure cloud deployment. Accomplish
                        more, together.
                    </p>
                    <Link href={user ? "/dashboard" : "/login"} className="self-start">
                        <HoverBorderGradient className="flex justify-center items-center">Get Started</HoverBorderGradient>
                    </Link>
                </div>
                <div className="lg:w-1/2 lg:inline-block hidden">
                    <div className="floating-logo">
                        <RTCTLogo size="500" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
