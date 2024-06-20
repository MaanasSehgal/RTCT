import React from "react";
import { CircleArrowLeft } from "lucide-react";
import ChatNavbar from "./ChatNavbar";

const ChatSection = ({onBack}:any) => {
    return (
        <div className="w-full h-full flex flex-col">
            <ChatNavbar/>
        </div>
    );
};

export default ChatSection;
