import {Input} from "@nextui-org/react";
import {Search} from "lucide-react";
import React from "react";
import Chat from "./Chat";

const SideBar = ({onChatClick, selectedChat}: any) => {
    const chats = [
        {id: 1, image: "/userlogo.png", name: "Maanas Sehgal", time: "2:12", notifications: "30"},
        {id: 2, image: "", name: "John Doe", time: "3:24", notifications: "0"},
        {id: 3, image: "", name: "Devendra Suryavanshi", time: "4:36", notifications: "0"},
        {id: 4, image: "", name: "Bob Johnson", time: "5:48", notifications: "0"},
        {id: 5, image: "", name: "Eva Green", time: "6:00", notifications: "0"},
        {id: 6, image: "", name: "Sam Wilson", time: "7:12", notifications: "0"},
        {id: 7, image: "", name: "Lily Brown", time: "8:24", notifications: "0"},
        {id: 8, image: "", name: "Chris Lee", time: "9:36", notifications: "0"},
        {id: 9, image: "", name: "Sophia Martinez", time: "10:48", notifications: "0"},
        {id: 10, image: "", name: "David Clark", time: "11:00", notifications: "0"},
    ];

    return (
        <div className="w-full h-full bg-[#131217] overflow-auto">
            <div className="w-full h-16 bg-[#1F1F1F] flex justify-center items-center px-4">
                <Input type="text" placeholder="Search" className="w-full text-gray-300 bg-[#1F1F1F] border border-gray-600 rounded-lg" />
                <Search width={20} className="ml-2 text-gray-300" />
            </div>
            <div className="flex flex-col w-full h-full py-4">
                {chats.map((chat) => (
                    <Chat key={chat.id} image={chat.image} name={chat.name} time={chat.time} notifications={chat.notifications} onClick={() => onChatClick(chat)} selected={selectedChat?.id === chat.id} />
                ))}
            </div>
        </div>
    );
};

export default SideBar;
