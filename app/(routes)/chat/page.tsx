"use client";
import React, { useState, useEffect } from "react";
import SideBar from "./components/ChatSidebar";
import ChatSection from "./components/ChatSection";
import { chatData } from "@/app/data/chats";

const ChatApp = () => {
    useEffect(() => {
        const footer = document.querySelector('Footer') as HTMLElement;
        if (footer) {
            footer.style.display = 'none';
        }
    }, []);

    const [showChat, setShowChat] = useState(false);
    const [selectedChat, setSelectedChat] = useState<any>("");
    const [drafts, setDrafts] = useState<{ [key: string]: string }>({});

    const defaultChat = { id: 1, image: "/userlogo.png", name: "Maanas Sehgal", time: "2:12", notifications: "30" };

    const handleChatClick = (chat: any) => {
        setShowChat(true);
        setSelectedChat(chat);
    };

    const handleDraftChange = (chatId: string, draft: string) => {
        setDrafts((prevDrafts) => ({ ...prevDrafts, [chatId]: draft }));
    };

    return (
        <div className="h-[93vh] lg:h-[90vh] flex bg-black">
            <div className={`${showChat ? "hidden" : "block"} md:block w-full md:w-1/4`}>
                <SideBar
                    chatData={chatData}
                    onChatClick={handleChatClick}
                    selectedChat={selectedChat}
                />
            </div>
            <div className={`${showChat ? "block" : "hidden"} md:block w-full md:w-3/4`}>
                {showChat ? (
                    <ChatSection
                        chatData={selectedChat}
                        onBack={() => setShowChat(false)}
                        draft={drafts[selectedChat?.chatID] || ""}
                        onDraftChange={handleDraftChange}
                    />
                ) : (
                    <ChatSection chatData={selectedChat} onBack={() => { }} selectedChat={defaultChat} />
                )}
            </div>
        </div>
    );
};

export default ChatApp;
