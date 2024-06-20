"use client";
import React, {useEffect, useRef, useState} from "react";
import {CircleArrowLeft, Search, Send, ArrowUpRight, Link, SendHorizontal, Smile} from "lucide-react";
import {Input} from "@nextui-org/react";
import Image from "next/image";
import Fuse from "fuse.js";
import TabsComponent from "./Tabs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const ChatSection = ({onBack, chatData}: any) => {
    const [showEmoji, setShowEmoji] = useState(false);
    const [text, setText] = useState("");
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [filteredChats, setFilteredChats] = useState<any[]>([]);
    const fuse = useRef<Fuse<unknown> | null>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (chatData) {
            fuse.current = new Fuse(chatData.chats, {
                keys: ["senderName", "content.text"],
                includeScore: true,
                threshold: 0.6,
            });
            setFilteredChats(chatData.chats);
        }
    }, [chatData]);

    const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setIsSearchVisible(false);
        }
    };

    const addEmoji = (e: {unified: string}) => {
        const sym = e.unified.split("_");
        // console.log(sym);
        const codeArray: number[] = [];
        sym.forEach((el) => {
            codeArray.push(parseInt("0x" + el, 16));
        });
        let emoji = String.fromCodePoint(...codeArray);
        console.log(emoji);
        setText(text + emoji);
    };

    const handleSearchInputChange = () => {
        if (searchRef.current?.value === "") {
            setFilteredChats(chatData.chats);
            return;
        }
        if (searchRef.current && fuse.current) {
            const query = searchRef.current.value;
            const result = fuse.current.search(query);
            setFilteredChats(result.map((item: any) => item.item));
        }
        if (searchRef.current && fuse.current && !searchRef.current.value.trim()) {
            setFilteredChats(chatData ? chatData.chats : []);
        }
    };

    return (
        <div className="w-full h-full flex flex-col">
            {/* Chat Nav*/}
            {chatData && (
                <div className="w-full h-16 flex items-center justify-between px-4">
                    <div className="flex items-center">
                        <button className="md:hidden" onClick={onBack}>
                            <CircleArrowLeft />
                        </button>
                        <div className="flex items-center gap-3 ps-4">
                            <Image src="/userLogo.png" alt="image" width={40} height={40} />
                            <h2>{chatData ? chatData.chatName : "Nobita"}</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {isSearchVisible ? (
                            <Input
                                autoFocus={true}
                                ref={searchRef}
                                classNames={{
                                    base: "w-full h-10",
                                    mainWrapper: "h-full",
                                    input: "text-small",
                                    inputWrapper: "rounded-full h-full font-normal text-default-500",
                                }}
                                placeholder="Type to search..."
                                size="sm"
                                type="search"
                                variant={"underlined"}
                                onChange={handleSearchInputChange}
                            />
                        ) : (
                            <button onClick={() => setIsSearchVisible(true)}>
                                <Search />
                            </button>
                        )}
                        <TabsComponent />
                    </div>
                </div>
            )}
            <div id="msg" className="w-full h-full bg-[--chatSectionBg] ">
                {isSearchVisible && filteredChats.length === 0 ? (
                    <div className="flex justify-center items-center">No results found</div>
                ) : chatData ? (
                    isSearchVisible ? (
                        filteredChats.map((chat: any) => (
                            <div className="p-4">
                                <div className="text-gray-200">{chat.senderName}</div>
                                <div className="text-gray-400 text-sm">
                                    {chat.content.msgType == "text" ? (
                                        chat.content.text
                                    ) : chat.content.msgType == "image" ? (
                                        <Image src="/nature.png" alt="image" width={60} height={60} />
                                    ) : chat.content.msgType == "file" ? (
                                        <div>File</div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        chatData.chats.map((chat: any) => (
                            <div className="p-4">
                                <div className="text-gray-200">{chat.senderName}</div>
                                <div className="text-gray-400 text-sm">
                                    {chat.content.msgType == "text" ? (
                                        chat.content.text
                                    ) : chat.content.msgType == "image" ? (
                                        <Image src="/nature.png" alt="image" width={60} height={60} />
                                    ) : chat.content.msgType == "file" ? (
                                        <div>File</div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        ))
                    )
                ) : (
                    <div className="w-full h-full flex justify-center items-center text-xl">Select a chat to start messaging!</div>
                )}
                {chatData && (
                    <div className=" w-full h-14 absolute bottom-0 flex items-center gap-4 p-4">
                        <Link />
                        <Smile onClick={() => setShowEmoji(!showEmoji)} />
                        {showEmoji && <Picker className="" data={data} emojiSize={20} emojiButtonSize={28} onEmojiSelect={addEmoji} maxFrequentRows={1} />}
                        <Input
                        value={text}
                            onChange={(e) => setText(e.target.value)}
                            classNames={{
                                base: "w-[67%] h-10",
                                mainWrapper: "h-full",
                                input: "text-small",
                                inputWrapper: "rounded-full h-12 font-normal text-default-500 bg-[#373E4E] hover:bg-[--tabsBg] active:bg-red-500",
                            }}
                            type="text"
                            placeholder="Type a Message"
                        />
                        <SendHorizontal className="bg-[--darkBtn] w-8 h-8 rounded-full p-1 " />
                    </div>
                )}
            </div>
            <div id="vc" className="w-full h-full bg-[--chatSectionBg] rounded-t-[30px] rounded-r-[30px] hidden text-center text-2xl">
                Maanasi ji can you join the RTCT ROOM ?
            </div>
        </div>
    );
};

export default ChatSection;
