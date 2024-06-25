"use client";

import React, { useState } from "react";

const page = () => {
    const [participantCount, setParticipantCount] = useState(4);

    const increaseParticipant = () => {
        setParticipantCount(participantCount + 1);
    };

    const decreaseParticipant = () => {
        setParticipantCount(participantCount - 1);
    };

    const renderParticipants = () => {
        return (
            <div className="w-full h-full p-8 flex flex-wrap justify-center items-center">
                {participantCount === 1 && (
                    <div className="w-4/5 h-full bg-[#3C4043] border border-white rounded-3xl m-4 flex justify-center items-center">
                        <p className="text-white text-xl font-bold">Participant 1</p>
                    </div>
                )}
                {participantCount === 2 && (
                    [...Array(participantCount)].map((_, index) => (
                        <div key={index} className="w-1/3 h-full bg-[#3C4043] border border-white rounded-3xl m-4 flex flex-row flex-nowrap justify-center items-center">
                            <p className="text-white text-xl font-bold">Participant {index + 1}</p>
                        </div>
                    ))
                )}
                {participantCount === 3 && (
                    [...Array(participantCount)].map((_, index) => (
                        <div key={index} className="w-1/4 h-full bg-[#3C4043] border border-white rounded-3xl m-4 flex justify-center items-center">
                            <p className="text-white text-xl font-bold">Participant {index + 1}</p>
                        </div>
                    ))
                )}
                {participantCount === 4 && (
                    <>
                        <div className="w-2/4 h-full bg-[#3C4043] border border-white rounded-3xl m-4 flex justify-center items-center">
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
                {participantCount > 4 && (
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
                            <div className="w-full h-full bg-[#3C4043] border border-white rounded-3xl flex justify-center items-center">
                                <p className="text-white text-xl font-bold">+{participantCount - 4}</p>
                            </div>
                        </div>
                    </>
                )}

            </div>

        );
    }
    return (
        <div className="w-screen min-h-[90vh] flex flex-col">
            {/*  bar */}
            <div className='w-screen h-[10vh] bg-blue-400 flex justify-center items-center'>
                <button disabled={participantCount == 1} className="bg-[#29903B] p-2 px-4 rounded-xl text-white text-medium hover:bg-[#36a048] font-bold cursor-pointer" onClick={decreaseParticipant}>Remove</button>
                <p className="text-white text-xl font-bold mx-4">Participants -&gt; {participantCount}</p>
                <button className="bg-[#29903B] p-2 px-4 rounded-xl text-white text-medium hover:bg-[#36a048] font-bold cursor-pointer" onClick={increaseParticipant}>Add</button>
            </div>
            {/* main meet area */}
            <div className='w-screen h-[90vh] bg-[#202124]'>
                {renderParticipants()}
            </div>
            <div className='w-screen h-[10vh] bg-blue-400 flex justify-between items-center'>
                <div className="">Current</div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default page