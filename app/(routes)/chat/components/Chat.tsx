import Image from "next/image";
import React from "react";

const Chat = ({image, name, time, onClick, selected, notifications}: any) => {
    console.log("CHAT");
    return (
        <div className={`flex items-center p-4 cursor-pointer transition duration-200 ease-in-out ${selected ? "bg-[#7731d8]" : "hover:bg-[#564977]"}`} onClick={onClick}>
            <Image src={image == "" ? "/userlogo.png" : image} alt="User" className="w-12 h-12 rounded-full object-cover object-center" width={200} height={200} />
            <div className="ml-4 flex-grow">
                <div className="text-gray-200">{name}</div>
                <div className="text-gray-400 text-sm">{time}</div>
            </div>
            {notifications > 0 && <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs p-1">{notifications}</div>}
        </div>
    );
};

export default Chat;
