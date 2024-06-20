"use client";
import React, {useState} from "react";
import SideBar from "./components/ChatSidebar";
import ChatSection from "./components/ChatSection";

const ChatApp = () => {
    const [showChat, setShowChat] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);

    // Default chat to open when the app loads
    const defaultChat = {id: 1, image: "/userlogo.png", name: "Maanas Sehgal", time: "2:12", notifications: "30"};

    return (
        <div className="h-screen flex ">
            <div className={`${showChat ? "hidden" : "block"} md:block w-full md:w-1/4`}>
                <SideBar
                    onChatClick={(chat: React.SetStateAction<null>) => {
                        setShowChat(true);
                        setSelectedChat(chat);
                    }}
                    selectedChat={selectedChat}
                />
            </div>
            <div className={`${showChat ? "block" : "hidden"} md:block w-full md:w-3/4`}>
                {showChat ? <ChatSection onBack={() => setShowChat(false)} /> : <ChatSection onBack={() => {}} selectedChat={defaultChat} />}
            </div>
        </div>
    );
};

export default ChatApp;
