import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import Chat from "./Chat";

const SideBar = ({ chatData, onChatClick, selectedChat }: any) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredChats: Array<{ chatName: string }> = chatData.filter((chat: { chatName: string }) =>
        chat.chatName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full h-full bg-[#272A35] border-r-white">
            <div className="w-full h-16 flex justify-center items-center px-4">
                <Input
                    classNames={{
                        base: "w-full h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "rounded-full h-full font-normal text-default-500 bg-black",
                    }}
                    placeholder="Type to search..."
                    size="sm"
                    startContent={<SearchIcon size={18} width={18} height={18} />}
                    type="search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="flex flex-col w-full h-[85%] py-4 hiddenScrollbar">
                {filteredChats && filteredChats.map((chat: any) => (
                    <Chat
                        key={chat.chatID}
                        image={chat.chats[0]?.senderID === "u001" ? "/userlogo.png" : ""}
                        name={chat.chatName}
                        time={chat.latestMsgtime}
                        onClick={() => onChatClick(chat)}
                        selected={selectedChat?.chatID === chat.chatID}
                        notifications={chat.notifications}
                    />
                ))}
            </div>
        </div>
    );
};

export default SideBar;
