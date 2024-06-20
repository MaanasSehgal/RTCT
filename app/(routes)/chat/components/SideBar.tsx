import {Input} from "@nextui-org/react";
import {Search} from "lucide-react";
import React from "react";
import Chat from "./Chat";

const SideBar = ({onChatClick}:any) => {
    return (
        <div className="w-full h-full bg-[#131217]">
            <div className="w-full h-16 bg-[#1F1F1F] flex justify-center items-center px-4">
                <Input type="text" placeholder="Search" className="w-full text-gray-300 bg-[#1F1F1F] border border-gray-600 rounded-lg" />
                <Search width={20} className="ml-2 text-gray-300" />
            </div>
            <div className="flex flex-col w-full h-full py-4">
                <Chat image="/userlogo.png" name="Maanas Sehgal" time="2:12" onClick={onChatClick} />
            </div>
        </div>
    );
};

export default SideBar;
