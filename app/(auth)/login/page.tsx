import React from "react";
import {LoginForm} from "../_components/Login";
import NavbarComponent from "@/components/Navbar/Navbar";

const page = () => {
    return (
        <>
        <NavbarComponent/>
        <div className="h-[--mainheight] w-full dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center bg-black">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <LoginForm />
        </div>
        </>
    );
};

export default page;
