"use client";
import React, { use, useEffect, useRef, useState } from "react";
import { CircleArrowLeft, Search, SendHorizontal, Smile, CirclePlus, ImagePlus, File, Paperclip, Download, Delete, Trash2, Copy, } from "lucide-react";
import { Button, Input, Tooltip, divider } from "@nextui-org/react";
import Image from "next/image";
import Fuse from "fuse.js";
import TabsComponent from "./Tabs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { toast } from "sonner";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const ChatSection = ({ onBack, chatData, draft, onDraftChange, onSend }: any) => {
    const [showEmoji, setShowEmoji] = useState(false);
    const [text, setText] = useState(draft);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [filteredChats, setFilteredChats] = useState<any[]>([]);
    const fuse = useRef<Fuse<unknown> | null>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const [copied, setCopied] = useState(false);
    const { user, getToken } = useKindeBrowserClient();

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSend(chatData[0], text);
            setText("");
            onDraftChange(chatData.chatID, "");
            event.currentTarget.focus();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const elem = document.getElementById('msg');
        if (!elem) return;
        elem.scrollTo({ top: elem.scrollHeight, behavior: 'instant' })
    }, []);

    useEffect(() => {
        if (chatData) {
            fuse.current = new Fuse(chatData[1], {
                keys: ["senderName", "content.text"],
                includeScore: true,
                threshold: 0.1,
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

    const inputRef = useRef<HTMLInputElement>(null);

    function formatDate(date: Date): string {
        // Helper function to pad single digits with a leading zero
        const pad = (num: number): string => num.toString().padStart(2, '0');

        // Get components of the date
        const hours: string = pad(date.getHours());
        const minutes: string = pad(date.getMinutes());
        const day: string = pad(date.getDate());
        const month: string = date.toLocaleString('default', { month: 'short' }); // Jan, Feb, Mar, etc.
        const year: string = date.getFullYear().toString().slice(-2); // Last two digits of the year

        // Combine components into the desired format
        return `${hours}:${minutes}, ${day}-${month}-${year}`;
    }

    const scrollToBottom = () => {
        const msgContainer = document.getElementById('msg');

        if (msgContainer) {
            msgContainer.scrollTop = msgContainer.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatData]);
    return (
        <div className="w-full h-full justify-between flex flex-col bg-[#131217]">
            {/* Chat Nav */}
            {chatData && (
                <div className="w-full h-16 flex items-center justify-between px-4 bg-black">
                    <div className="flex items-center">
                        <button className="md:hidden" onClick={onBack}>
                            <CircleArrowLeft />
                        </button>
                        <div className="flex items-center gap-3 ps-4">
                            <img className="rounded-full w-10 h-10 object-center object-cover" src={chatData ? chatData[0].image : "/userLogo.png"} alt="image" width={200} height={200} />
                            <h2>{chatData ? chatData[0].first_name + " " + chatData[0].last_name : "Nobita"}</h2>
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
            <div id="msg" style={{ height: 'calc(100% - 72px)' }} className="w-full bg-[--chatSectionBg] gap-7  overflow-y-auto p-4 .hiddenScrollbar flex flex-col">
                {isSearchVisible && filteredChats.length === 0 ? (
                    <div className="flex justify-center items-center">No results found</div>
                ) : chatData ? (
                    isSearchVisible ? (
                        filteredChats.map((chat: any) => (
                            <div className={`flex ${user?.id === chat.senderID ? 'justify-end' : 'justify-start'} items-center w-full`} key={chat.senderID}>
                                <div className={`p-2 ${user?.id == chat.senderID ? 'bg-[#272A35]' : 'bg-[#373E4E]'} flex-col gap-10 rounded-[20px] max-w-[80%] min-w-[21rem] w-auto mb-6`}>
                                    <div className={`mb-4 flex ${user?.id == chat.senderID ? 'justify-end' : 'justify-start'} items-center`}>
                                        {chat.content.msgType == "image" ? (
                                            <Image className="rounded-xl w-96 sm:w-[25rem] object-cover" src="/nobita.jpg" alt="image" width={1000} height={1000} />
                                        ) : chat.content.msgType == "file" ? (
                                            <div className="bg-[#272A35] p-4 rounded-xl flex gap-4 w-64 truncate line-clamp-1">
                                                <File />
                                                <p className="w-full truncate line-clamp-1">{`server.js`}</p>
                                            </div>
                                        ) : (
                                            <p className={`break-words max-w-full inline-block h-auto text-lg`}>{chat.content.text}</p>
                                        )}
                                    </div>

                                    <div className={`flex items-center gap-2 min-w-80 ${user?.id === chat.senderID ? 'flex-row-reverse' : 'justify-start'}`}>
                                        <Tooltip content={chat.senderName}>
                                            <Image className="rounded-full w-8 h-8 object-cover cursor-pointer" src="/nobita.jpg" alt="image" width={1000} height={1000} />
                                        </Tooltip>
                                        <p className="text-gray-400 text-sm h-full m-0 rounded-full self-end">{formatDate(new Date(chat.timestamp))}</p>
                                        {chat.content.msgType == "image" || chat.content.msgType == "file" && (
                                            <div className="flex items-center gap-2 rounded-full bg-black p-2">
                                                <a href={'./RTCTLOGOIMG.png'} download={'RTCTLOGOIMG.png'}>
                                                    <Download size={20} />
                                                </a>
                                                <Trash2 size={20} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (chatData[1].length > 0 &&
                        chatData[1].map((chat: any) => (
                            <div className={`flex ${user?.id === chat.senderID ? 'justify-end' : 'justify-start'} items-center w-full`} key={chat.senderID}>
                                <div className={`p-2 ${user?.id == chat.senderID ? 'bg-[#272A35]' : 'bg-[#373E4E]'} flex-col gap-10 rounded-[20px] max-w-[80%] min-w-[21rem] w-auto mb-6`}>
                                    <div className={`mb-4 flex ${user?.id == chat.senderID ? 'justify-end' : 'justify-start'} items-center`}>
                                        {chat.content.msgType == "image" ? (
                                            <Image className="rounded-xl w-96 sm:w-[25rem] object-cover" src="/nobita.jpg" alt="image" width={1000} height={1000} />
                                        ) : chat.content.msgType == "file" ? (
                                            <div className="bg-[#272A35] p-4 rounded-xl flex gap-4 w-64 truncate line-clamp-1">
                                                <File />
                                                <p className="w-full truncate line-clamp-1">{`server.js`}</p>
                                            </div>
                                        ) : (
                                            <p className={`break-words max-w-full inline-block h-auto text-lg`}>{chat.content.text}</p>
                                        )}
                                    </div>

                                    <div className={`flex items-center gap-2 min-w-80 ${user?.id === chat.senderID ? 'flex-row-reverse' : 'justify-start'}`}>
                                        <Tooltip content={chat.senderName}>
                                            <Image className="rounded-full w-8 h-8 object-cover cursor-pointer" src="/nobita.jpg" alt="image" width={1000} height={1000} />
                                        </Tooltip>
                                        <p className="text-gray-400 text-sm h-full m-0 rounded-full self-end">{formatDate(new Date(chat.timestamp))}</p>
                                        {chat.content.msgType == "image" || chat.content.msgType == "file" && (
                                            <div className="flex items-center gap-2 rounded-full bg-black p-2">
                                                <a href={'./RTCTLOGOIMG.png'} download={'RTCTLOGOIMG.png'}>
                                                    <Download size={20} />
                                                </a>
                                                <Trash2 size={20} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                ) : (
                    <div className="w-full h-full flex justify-center items-center text-xl">Select a chat to start messaging!</div>
                )}
            </div>
            {chatData && (
                <div className="w-full h-16 bottom-0 flex items-center gap-2 p-2 bg-[#131217]">
                    <Smile className="cursor-pointer" size={30} onClick={() => setShowEmoji(!showEmoji)} />
                    <div className="absolute bottom-16">
                        {showEmoji && <Picker data={data} emojiSize={20} emojiButtonSize={28} onEmojiSelect={addEmoji} maxFrequentRows={1} />}
                    </div>
                    <Tooltip radius="lg" className="p-2" content={<div className="flex flex-col items-start justify-center gap-4">
                        <Label className="flex justify-center items-center hover:text-purple-400 cursor-pointer" htmlFor="img-input"><ImagePlus size={30} />&nbsp;Image</Label>
                        <Label className="flex justify-center items-center hover:text-purple-400 cursor-pointer" htmlFor="file-input"><File size={30} />&nbsp;File</Label>
                    </div>}>
                        <button>
                            <Paperclip className="hover:text-purple-400" size={25} />
                        </button>
                    </Tooltip>
                    <Input id="img-input" type="file" accept={'image/*'} className="hidden" />
                    <Input
                        ref={inputRef}
                        autoFocus={true}
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            onDraftChange(chatData.chatID, e.target.value);
                        }}
                        onKeyPress={handleKeyPress}
                        classNames={{
                            // base: " h-10",
                            // mainWrapper: "h-full",
                            input: "text-lg",
                            inputWrapper: "rounded-full ",
                        }}
                        type="text"
                        placeholder="Type a Message"
                    />
                    <button className="md:hidden inline-block" onClick={() => {
                        onSend(chatData[0], text)
                    }}>
                        <SendHorizontal className="bg-[--darkBtn] w-8 h-8 rounded-full p-1" />
                    </button>

                </div>
            )}
            <div id="vc" className="w-full h-full bg-[--chatSectionBg] rounded-t-[30px] rounded-r-[30px] hidden text-center text-2xl">
                Maanasi ji can you join the RTCT ROOM ?
            </div>
        </div>
    );
};

export default ChatSection;