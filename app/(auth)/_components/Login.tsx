"use client";
import React, {useState} from "react";
import {IconBrandGithub, IconBrandGoogle, IconEye, IconEyeOff} from "@tabler/icons-react";
import {cn} from "@/app/utils/cn";
import Link from "next/link";
import {Label} from "./Label";
import {Input} from "./Input";

export function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        showPassword: false, // Track whether password is visible or not
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    const togglePasswordVisibility = () => {
        setFormData((prevState) => ({
            ...prevState,
            showPassword: !prevState.showPassword,
        }));
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-6 md:p-10 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-2xl text-white">Login</h2>
            <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input id="email" placeholder="projectmayhem@fc.com" type="email" required />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">
                        Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => setFormData((prevState) => ({...prevState, password: e.target.value}))}
                            placeholder="••••••••"
                            type={formData.showPassword ? "text" : "password"}
                            required
                        />
                        <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none" onClick={togglePasswordVisibility}>
                            {formData.showPassword ? <IconEyeOff /> : <IconEye />}
                        </button>
                    </div>
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit">
                    Sign In &rarr;
                    <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                <div className="flex flex-col space-y-4">
                    <button
                        className="relative group/btn flex space-x-2 justify-center items-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        type="submit">
                        <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">Google</span>
                        <BottomGradient />
                    </button>
                    <button
                        className="relative group/btn flex space-x-2 justify-center items-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        type="submit">
                        <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">GitHub</span>
                        <BottomGradient />
                    </button>
                </div>
                <div className="mt-4">
                    Not registered yet?{" "}
                    <Link className="text-blue-500" href="/signup">
                        Create an account
                    </Link>
                </div>
            </form>
        </div>
    );
}
const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({children, className}: {children: React.ReactNode; className?: string}) => {
    return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
