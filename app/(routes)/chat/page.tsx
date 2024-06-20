"use client";
import React, {useState} from "react";
import SideBar from "./components/SideBar";
import ChatSection from "./components/ChatSection";

const ChatApp = () => {
    const [showChat, setShowChat] = useState(false);

    return (
        <div className="h-screen flex bg-gray-800">
            {/* Conditionally render Sidebar or ChatSection based on screen size and state */}
            <div className={`${showChat ? "hidden" : "block"} md:block w-full md:w-1/4`}>
                <SideBar onChatClick={() => setShowChat(true)} />
            </div>
            <div className={`${showChat ? "block" : "hidden"} md:block w-full md:w-3/4`}>
                <ChatSection onBack={() => setShowChat(false)} />
            </div>
        </div>
    );
};

export default ChatApp;
