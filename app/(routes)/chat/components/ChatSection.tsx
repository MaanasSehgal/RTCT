"use client";
import React, { useEffect, useRef, useState } from "react";
import { CircleArrowLeft, Search, SendHorizontal, Smile, CirclePlus } from "lucide-react";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import Fuse from "fuse.js";
import TabsComponent from "./Tabs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const ChatSection = ({ onBack, chatData, draft, onDraftChange, onSend}: any) => {
    const [showEmoji, setShowEmoji] = useState(false);
    const [text, setText] = useState(draft);
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
            fuse.current = new Fuse(chatData[1], {
                keys: ["senderName", "content.text"],
                includeScore: true,
                threshold: 0.6,
            });
            setFilteredChats(chatData[1]);
        }
    }, [chatData]);

    useEffect(() => {
        setText(draft);
    }, [draft]);

    const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setIsSearchVisible(false);
        }
    };

    const addEmoji = (e: { unified: string }) => {
        const sym = e.unified.split("_");
        const codeArray: number[] = [];
        sym.forEach((el) => {
            codeArray.push(parseInt("0x" + el, 16));
        });
        let emoji = String.fromCodePoint(...codeArray);
        setText(text + emoji);
        onDraftChange(chatData.chatID, text + emoji);
    };

    const handleSearchInputChange = () => {
        if (searchRef.current?.value === "") {
            setFilteredChats(chatData[1]);
            return;
        }
        if (searchRef.current && fuse.current) {
            const query = searchRef.current.value;
            const result = fuse.current.search(query);
            setFilteredChats(result.map((item: any) => item.item));
        }
        if (searchRef.current && fuse.current && !searchRef.current.value.trim()) {
            setFilteredChats(chatData ? chatData[1] : []);
        }
    };

    return (
        <div className="w-full h-full flex flex-col">
            {/* Chat Nav */}
            {chatData && (
                <div className="w-full h-16 flex items-center justify-between px-4">
                    <div className="flex items-center">
                        <button className="md:hidden" onClick={onBack}>
                            <CircleArrowLeft />
                        </button>
                        <div className="flex items-center gap-3 ps-4">
                            <Image src={chatData? chatData[0].image:"/userLogo.png"} alt="image" width={40} height={40} />
                            <h2>{chatData ? chatData[0].first_name+" "+chatData[0].last_name : "Nobita"}</h2>
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
            <div id="msg" className="w-full h-full bg-[--chatSectionBg] overflow-y-auto pb-14 .hiddenScrollbar">
                {isSearchVisible && filteredChats.length === 0 ? (
                    <div className="flex justify-center items-center">No results found</div>
                ) : chatData? (
                    isSearchVisible ? (
                        filteredChats.map((chat: any) => (
                            <div key={chat.senderID} className="p-4">
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
                    ) : (chatData[1].length>0&&
                        chatData[1].map((chat: any) => (
                            <div key={chat.senderID} className="p-4">
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
                    <div className="w-full h-14 absolute bottom-0 flex items-center gap-4 p-4 bg-[#131217]">
                        <Smile onClick={() => setShowEmoji(!showEmoji)} />
                        <div className="absolute bottom-12 left-0">
                            {showEmoji && <Picker data={data} emojiSize={20} emojiButtonSize={28} onEmojiSelect={addEmoji} maxFrequentRows={1} />}
                        </div>
                        <CirclePlus className="file-link absolute left-16 z-20 w-6 h-6 p-0.5 bg-white text-black rounded-full bold-text" />
                        <Input
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value);
                                onDraftChange(chatData.chatID, e.target.value);
                            }}
                            classNames={{
                                base: "lg:w-[71%] md:w-[62%] sm:w-[60%] w-[70%] h-10",
                                mainWrapper: "h-full",
                                input: "ps-6 text-small",
                                inputWrapper: "rounded-full h-12 font-normal text-default-500 bg-[#373E4E] hover:bg-[--tabsBg] active:bg-red-500 ",
                            }}
                            type="text"
                            placeholder="Type a Message"
                        />
                        <button onClick={()=>{
                            onSend(chatData[0] ,text)
                        }}>
                            <SendHorizontal className="bg-[--darkBtn] w-8 h-8 rounded-full p-1 " />
                        </button>

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