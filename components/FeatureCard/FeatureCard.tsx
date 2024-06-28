"use client";
import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";

const App = () => {
    return (
        <>
            <h2 id="scroll-to-features" className="text-5xl font-medium my-5 px-[8%]">Features</h2>
            <div className="px-[8%] bg-black gap-8 grid grid-cols-12 grid-rows-2 mb-14">
                {/* Real-time Collaboration */}
                <Card className="bg-black col-span-12 sm:col-span-4 h-[300px] hover:shadow-lg transform hover:scale-105 transition duration-300">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className=" text-xl text-[--darkText1] uppercase font-bold">Real-time Collaboration</p>
                        <h4 className="text-[--darkText2] font-medium text-sm">Edit code & documents together</h4>
                    </CardHeader>

                    <Image
                        removeWrapper
                        alt="Collaboration background"
                        className="z-0 w-full h-full object-cover"
                        src="https://simplea.com/getmedia/d13d6154-e506-4cf6-a619-49728dcc2323/2_3_62_Simplea_com_blog_article_Is_Real_Time_Collaboration_a_real_thing_cover_800x400.jpg.aspx"
                    />
                </Card>

                {/* Task Management */}
                <Card className="bg-black col-span-12 sm:col-span-4 h-[300px] hover:shadow-lg transform hover:scale-105 transition duration-300">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className=" text-xl text-[--darkText1] uppercase font-bold">Task Management</p>
                        <h4 className="text-[--darkText2] font-medium text-sm">Organize & track project tasks</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Task management background"
                        className="z-0 w-full h-full object-cover"
                        src="https://media.istockphoto.com/id/1492645918/photo/survey-form-concept-businessman-using-laptops-do-online-checklist-surveys-questionnaire-with.jpg?s=612x612&w=0&k=20&c=lqbzWDBLxqRe99kOz2GwfWDRzkVduf2BvUzn1NBGh7Q="
                    />
                </Card>

                {/* Progress Tracking */}
                <Card className="bg-black col-span-12 sm:col-span-4 h-[300px] hover:shadow-lg transform hover:scale-105 transition duration-300">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className=" text-xl text-[--darkText1] uppercase font-bold">Progress Tracking</p>
                        <h4 className="text-[--darkText2] font-medium text-sm">Monitor your team's progress</h4>
                    </CardHeader>
                    <Image removeWrapper alt="Progress tracking background" className="z-0 w-full h-full object-cover" src="https://nextui.org/images/card-example-2.jpeg" />
                </Card>

                {/* Video Conferencing */}
                <Card isFooterBlurred className="bg-black w-full h-[300px] col-span-12 sm:col-span-5 hover:shadow-lg transform hover:scale-105 transition duration-300">
                    <Image
                        removeWrapper
                        alt="Video conferencing background"
                        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                        src="https://media.istockphoto.com/id/1348273234/photo/unrecognizable-businesswoman-talking-on-conference-call-meeting.jpg?s=612x612&w=0&k=20&c=6XG59JWY03elk0KgLGhkXDruCZPoa0sM7yE7cQeQiFw= "
                    />
                    <CardFooter className="h-20 absolute bg-black/30 bottom-0 border-t-1 z-10 justify-between">
                        <div>
                            <p className=" text-xl text-[--darkText1] uppercase font-bold">Video Conferencing</p>
                            <h4 className="text-[--darkText2] font-medium text-sm">Connect with your team instantly</h4>
                        </div>
                    </CardFooter>
                </Card>

                {/* Live Editing */}
                <Card isFooterBlurred className="bg-black w-full h-[300px] col-span-12 sm:col-span-7 hover:shadow-lg transform hover:scale-105 transition duration-300">
                    <Image removeWrapper alt="Live editing background" className="z-0 w-full h-full object-cover" src="https://i.ytimg.com/vi/sS8DWRQ_tao/maxresdefault.jpg" />
                    <CardFooter className="h-20 absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-100">
                        <div className="flex flex-grow gap-2 items-center">
                            <Image alt="Live editing icon" className="rounded-full w-10 h-10 hidden sm:inline-block bg-black" src="https://nextui.org/images/breathing-app-icon.jpeg" />
                            <div className="flex flex-col">
                                <p className=" text-xl text-[--darkText1] uppercase font-bold">Visual Studio Code</p>
                                <h4 className="text-[--darkText2] font-medium text-xs md:text-sm">Experience seamless collaboration on the most loved code editor.</h4>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
};

export default App;
