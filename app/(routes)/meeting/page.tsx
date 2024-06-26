"use client";

import { Hand, LogOut, MessageSquareMore, Mic, MicOff, UserRound, Video, VideoOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Sidebar from "./Sidebar";

const Page = () => {
    const [participantCount, setParticipantCount] = useState(1);
    const [micOn, setMicOn] = useState(false);
    const [videoOn, setVideoOn] = useState(false);
    const [handRaised, setHandRaised] = useState(false);
    const [leaveCall, setLeaveCall] = useState(false);
    const [changeFlex, setChangeFlex] = useState(true);

    const [elapsedTime, setElapsedTime] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedTime(prevTime => prevTime + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: any) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const increaseParticipant = () => {
        setParticipantCount(participantCount + 1);
        if (participantCount <= 4) {
            setChangeFlex(false);
        }
    };

    const decreaseParticipant = () => {
        setParticipantCount(participantCount - 1);
        if (participantCount <= 4) {
            setChangeFlex(false);
        }
    };

    const handleMicOn = () => {
        setMicOn(!micOn);
    }

    const handleVideoOn = () => {
        setVideoOn(!videoOn);
    }

    const handleHandRaised = () => {
        setHandRaised(!handRaised);
    }

    const handleLeaveCall = () => {
        setLeaveCall(true);
        toast("Leaving the call");
    }

    const handleMessageOpen = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleParticipantsOpen = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const renderParticipants = () => {
        return (
            <div className="w-full h-full py-8 px-4 flex flex-wrap justify-center items-center">
                {participantCount < 4 && [...Array(participantCount)].map((_, index) => (
                    <div key={index} className={`${participantCount === 1 ? 'w-4/5 h-full' : participantCount === 2 ? 'w-1/3 h-1/2 gap-2' : 'w-1/3 h-1/2'} bg-[#3C4043] border border-white rounded-3xl m-4 flex justify-center items-center`}>
                        <p className="text-white text-xl font-bold">Participant {index + 1}</p>
                    </div>
                ))}

                {participantCount === 4 && (
                    <>
                        <div className="w-1/2 h-full bg-[#3C4043] border border-white rounded-3xl m-4 flex justify-center items-center">
                            <p className="text-white text-xl font-bold">Participant 1</p>
                        </div>
                        <div className="w-1/4 h-full gap-4 rounded-3xl flex flex-col justify-between items-center">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="w-full h-full bg-[#3C4043] border border-white rounded-3xl flex justify-center items-center">
                                    <p className="text-white text-xl font-bold">Participant {index + 2}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {participantCount > 4 && !changeFlex && (
                    <>
                        <div className="w-2/4 h-full bg-[#3C4043] border border-white rounded-3xl m-4 flex justify-center items-center">
                            <p className="text-white text-xl font-bold">Participant 1</p>
                        </div>
                        <div className="w-1/4 h-full gap-4 rounded-3xl flex flex-col justify-between items-center">
                            {[...Array(2)].map((_, index) => (
                                <div key={index} className="w-full h-full bg-[#3C4043] border border-white rounded-3xl flex justify-center items-center">
                                    <p className="text-white text-xl font-bold">Participant {index + 2}</p>
                                </div>
                            ))}
                            <div onClick={() => setChangeFlex(true)} className="w-full h-full bg-[#3C4043] border cursor-pointer border-white rounded-3xl flex justify-center items-center">
                                <p className="text-white text-xl font-bold">+{participantCount - 4}</p>
                            </div>
                        </div>
                    </>
                )}
                {participantCount > 4 && changeFlex && (
                    [...Array(participantCount)].map((_, index) => (
                        <div key={index} className="w-1/4 h-1/2 bg-[#3C4043] border border-white rounded-3xl m-4 flex justify-center items-center">
                            <p className="text-white text-xl font-bold">Participant {index + 1}</p>
                        </div>
                    ))
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-row min-h-screen">
            <div className={`w-[${isSidebarOpen ? '60vw' : '80vw'}] min-h-[90vh] flex flex-col transition-width duration-300`}>
                {/* bar */}
                <div className='w-screen h-[10vh] bg-blue-400 flex justify-center items-center'>
                    <button disabled={participantCount === 1} className="bg-[#29903B] p-2 px-4 rounded-xl text-white text-medium hover:bg-[#36a048] font-bold cursor-pointer" onClick={decreaseParticipant}>Remove</button>
                    <p className="text-white text-xl font-bold mx-4">Participants -&gt; {participantCount}</p>
                    <button className="bg-[#29903B] p-2 px-4 rounded-xl text-white text-medium hover:bg-[#36a048] font-bold cursor-pointer" onClick={increaseParticipant}>Add</button>
                </div>
                {/* main meet area */}
                <div className='w-screen min-h-[90vh] bg-[#202124] pb-40'>
                    {renderParticipants()}
                </div>
                {/* Menu bar */}
                <div className='w-screen h-[10vh] z-20 fixed bottom-0 left-0 bg-blue-400 flex justify-between items-center'>
                    <div className="text-white text-xl font-bold mx-4 flex justify-center items-center">
                        {formatTime(elapsedTime)}
                    </div>
                    <div className="flex flex-row gap-2 h-full justify-center items-center ">
                        <div onClick={() => handleMicOn()} className={`bg-${micOn ? "gray-500" : "red-500"} rounded-full w-12 h-12 flex justify-center items-center text-white`}>{micOn ? <Mic /> : <MicOff />}</div>
                        <div onClick={() => handleVideoOn()} className={`bg-${videoOn ? "gray-500" : "red-500"} rounded-full w-12 h-12 flex justify-center items-center text-white`}>{videoOn ? <Video /> : <VideoOff />}</div>
                        <div onClick={() => handleHandRaised()} className={`bg-${handRaised ? "gray-500" : "yellow-500"} rounded-full w-12 h-12 flex justify-center items-center text-white`}>
                            <Hand />
                        </div>
                        <div onClick={() => handleLeaveCall()} className="bg-red-500 rounded-full w-12 h-12 flex justify-center items-center text-white">
                            <LogOut />
                        </div>
                    </div>
                    <div className="flex justify-center items-center h-full">
                        <div onClick={() => handleMessageOpen()} className="rounded-full w-12 h-12 flex justify-center items-center text-white">
                            <MessageSquareMore />
                        </div>
                        <div onClick={() => handleParticipantsOpen()} className="rounded-full w-12 h-12 flex justify-center items-center text-white">
                            <UserRound />
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </div>
    );
}

export default Page;
