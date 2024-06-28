import {Input} from "@nextui-org/react";
import {SearchIcon} from "lucide-react";
import React, {useEffect, useState} from "react";
import Chat from "./Chat";

const SideBar = ({chatData, onChatClick, selectedChat}: any) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredChats, setFilteredChats] = useState<any[]>();
    const [update, setUpdate] = useState("");
    useEffect(() => {
        setFilteredChats(Array.from(chatData.values()));
    }, [chatData]);

    useEffect(() => {
        const chats = chatData.values().filter((data: [any, [{}]]) => {
            const a = (data[0].first_name + " " + data[0].last_name).toLowerCase().includes(searchQuery.toLowerCase());
            console.log(a);
            return a;
        });
        setFilteredChats(Array.from(chats));
    }, [searchQuery]);


    return (
        <div className="w-full h-full bg-[#191B22] border-r-white">
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
                    startContent={<SearchIcon size={18} width={18} height={18}/>}
                    type="search"
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                />
            </div>
            <div className="flex flex-col w-full h-[85%] py-4 hiddenScrollbar">
                {filteredChats && filteredChats.map((chat: any) => (
                    <Chat
                        // key={chat[0].id}
                        image={chat[0].image}
                        name={chat[0].first_name + " " + chat[0].last_name}
                        time={chat[1].at(-1)?.time}
                        onClick={() => onChatClick(chat)}
                        selected={selectedChat?.id === chat[0].id}
                        notifications={chat[0].unread}
                    />
                ))}
                {/*{update && (<div></div>)}*/}
            </div>
        </div>
    );
};

export default SideBar;
