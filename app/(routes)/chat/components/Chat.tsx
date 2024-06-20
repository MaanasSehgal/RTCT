import React from "react";

const Chat = ({image, name, time, onClick}:any) => {
    return (
        <div className="flex items-center p-4 cursor-pointer" onClick={onClick}>
            <img src={image} alt="User" className="w-12 h-12 rounded-full" />
            <div className="ml-4">
                <div className="text-white">{name}</div>
                <div className="text-gray-400 text-sm">{time}</div>
            </div>
        </div>
    );
};

export default Chat;
